import Opportunities from '../classes/opportunities';
import MongoDB from '../database/mongoConnect';

export class OpportunitiesRepository {
    public async saveOpportunities(upsert: Opportunities) {

        return new Promise<Opportunities>((resolve, reject) => {
            try {

                MongoDB.Opportunities.findOneAndUpdate(upsert, {$setOnInsert: upsert}, { new: true, upsert: true, setDefaultsOnInsert: true}, (err: any, resp: any) => {

                    if (err) {
                        throw err;
                    }
                    resolve(resp);

                }).lean().exec();

            }
            catch (error) {
                reject(error);
            }
        });

    }

    public async getOpportunitiesList(query: any) {

        return new Promise<Array<Opportunities>>((resolve, reject) => {
            try {

                MongoDB.Opportunities.find(query, (err: any, resp: any) => {

                    if (err) {
                        throw err;
                    }
                    resolve(resp);

                }).lean().exec();

            }
            catch (error) {
                reject(error);
            }
        });

    }
}