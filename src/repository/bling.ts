import axios from 'axios';
import { json2xml } from 'xml-js';
import qs from 'qs';

export class BlingRepository {

    private baseUrl: string = "https://bling.com.br/Api/v2";
    private apiToken: string = "f0946ebc90b9b036c5ac5a27797677ac30a9d2cfbf2106032246816e07fa144569e42a39";

    constructor() { }

    public async sendOrder(_json: any) {

        try {

            let xml = await this.convertJsontoXml(_json);

            let queryString = qs.stringify({
                apikey: this.apiToken,
                xml: xml
            });

            let options = {
                baseURL: this.baseUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }

            let response = await axios.post("/pedido/json/", queryString, options);

            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

    private async convertJsontoXml(_json: string) {

        let options = { compact: true, ignoreComment: true, spaces: 4 };
        let xml = json2xml(_json, options);
        return xml;
    }    
}