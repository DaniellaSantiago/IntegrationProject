import axios from 'axios';

export class PipeDriveRepository {

    private baseUrl: string = "https://daniella.pipedrive.com/v1";
    private apiToken: string = "9f0e9de9c467faa91f3bc82d4392de9d4f194b8b";

    constructor() { }

    public async getDealsTimeline(_fieldKey: string, _startDate: Date, _interval: string, _amount: number) {

        try {
            //Recebe objeto de data e converte para o formato esperado pela API
            let [startDate, startTime] = _startDate.toISOString().split("T");
            let startDateTime: string = `${startDate} ${startTime.substring(0, 8)}`;

            let options = {
                baseURL: this.baseUrl,
                params: {
                    api_token: this.apiToken,
                    field_key: _fieldKey,
                    start_date: startDateTime,
                    interval: _interval,
                    amount: _amount
                }
            }

            let response = await axios.get("/deals/timeline", options);
            
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
}