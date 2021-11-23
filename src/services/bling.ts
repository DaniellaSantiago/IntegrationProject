import { BlingRepository } from '../repository/bling';
import { OpportunitiesRepository } from '../repository/opportunities';

export class BlingService {

    public async sendOrder(_dealsList: any) {
        try {
            let blingRepository: BlingRepository = new BlingRepository();
            let responseList = [];
            let promiseList = [];
            let totalSum = 0;

            for (let deal of _dealsList) {
                try {
                    let bodyRequest = {
                        "pedido": {
                            "cliente": {
                                "nome": deal.owner_name
                            },
                            "transporte": {
                                "volumes": [{
                                    "volume": {
                                        "servico": "SEDEX - CONTRATO"
                                    }
                                }]
                            },
                            "itens": [{
                                "item": {
                                    "codigo": "001",
                                    "descricao": "Caneta 001",
                                    "qtde": deal.products_count,
                                    "vlr_unit": deal.value
                                }
                            }],
                            "parcelas": [{
                                "parcela": {
                                    "vlr": deal.value
                                }
                            }]
                        }
                    }

                    totalSum += deal.value;

                    promiseList.push(blingRepository.sendOrder(bodyRequest));
                }
                catch (error) {
                    throw error;
                }
            }

            responseList = await Promise.all(promiseList);

            return {
                "responseList": responseList,
                "totalSum": totalSum
            };

        }
        catch (error) {
            throw error;
        }
    }

    public async getOpportunities(_startDate: Date, _endDate: Date) {
        try {
            let opportunitiesRepository: OpportunitiesRepository = new OpportunitiesRepository();

            let query = {
                "date": {$gt: _startDate, $lt: _endDate}
            };
            
            let response = await opportunitiesRepository.getOpportunitiesList(query);
            
            return response;

        }
        catch (error) {
            throw error;
        }
    }
}