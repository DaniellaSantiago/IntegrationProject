import Opportunities from '../classes/opportunities';
import { OpportunitiesRepository } from '../repository/opportunities';
import { PipeDriveRepository } from '../repository/pipedrive';
import { BlingService } from './bling';

export class PipedriveService {

    public async getDealsTimeLine(_date: Date) {
        try {
            let pipeDriveRepository: PipeDriveRepository = new PipeDriveRepository();
            let blingService: BlingService = new BlingService();

            let dealsList = await pipeDriveRepository.getDealsTimeline("update_time", _date, "day", 1);

            if (!dealsList.success) {
                throw new Error("Erro ao buscar os negócios!");
            }

            let fromSendOrders = await blingService.sendOrder([dealsList.data[0].deals[4]]);
            let orderIds: Array<number> = [];

            let errorList = [];

            for (let order of fromSendOrders.responseList) {
                try {

                    if (order.retorno.erros) {
                        throw new Error(order.retorno.erros.map((x: any) => x.erro.msg));
                    }

                    orderIds = [...orderIds, ...order.retorno.pedidos.map((x: any) => x.pedido.idPedido)];
                }
                catch (error) {
                    errorList.push(error.toString());
                }
            }

            let opportunities = new Opportunities(fromSendOrders.totalSum, orderIds.join("|"), _date);
            let saveMongo = null;

            if (orderIds.length > 0) {
                let opportunitiesRepository = new OpportunitiesRepository();

                saveMongo = await opportunitiesRepository.saveOpportunities(opportunities);
            }

            return {
                "saveMongo": saveMongo,
                "error": errorList
            };
        }
        catch (error) {
            throw error;
        }
    }
}