//Importação de modulos
import * as express from "express";

//Importação de controllers
import { PipedriveController } from "./controllers/pipedrive";
import { BlingController } from "./controllers/bling";

/** Classe de gerenciamento das rotas*/
export default class Routes {

    constructor() { }

    public getRoutes(): express.Router {
        let route: express.Router;
        route = express.Router();

        //instanciar controllers
        let pipedriveController = new PipedriveController();
        let blingController = new BlingController();

        //Configurar rotas

        //Check health
        route.get('/status', (req, res) => {
            res.send("Aplicação online");
        });

        //GetDealsTimeLine and getOpportunities
        route.post('/pipedrive/deals/timeLine', pipedriveController.getDealsTimeLine);
        route.get('/bling/getOpportunities', blingController.getOpportunities);

        return route;
    }
}