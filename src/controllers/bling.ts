import * as express from 'express';
import { BlingService } from '../services/bling';

export class BlingController {

    public async getOpportunities(_request: express.Request, _response: express.Response){
        try{
            if (!_request.query.startDate) {
                throw "startDate is required";
            }

            if (!_request.query.endDate) {
                throw "endDate is required";
            }

            let startDate = new Date(_request.query.startDate.toString());
            let endDate = new Date(_request.query.endDate.toString());

            let blingService: BlingService = new BlingService();

            let response = await blingService.getOpportunities(startDate, endDate);

            return _response.status(200).json(response);
        }
        catch(error){
            _response.status(400).json(error.toString());
        }
    }
}