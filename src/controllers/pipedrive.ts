import * as express from 'express';
import { PipedriveService } from '../services/pipedrive';

export class PipedriveController {

    public async getDealsTimeLine(_request: express.Request, _response: express.Response) {
        try {
            let pipedriveService: PipedriveService = new PipedriveService();
            
            if (!_request.body.Date) {
                throw "Date is required";
            }

            let date = new Date(_request.body.Date);

            let response = await pipedriveService.getDealsTimeLine(date);

            return _response.status(200).json(response);
        }
        catch (error) {
            _response.status(400).json(error.toString());
        }
    }
}