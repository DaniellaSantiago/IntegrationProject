import mongoose from 'mongoose';
const connectionString = `mongodb+srv://daniellaSantiago:3yzcK9vgBjL2XJQ@integration.uiwni.mongodb.net/Bling?retryWrites=true&w=majority`;

export default class MongoDB {
    //Exporta as models das collections do mongo
    public static Opportunities: mongoose.Model<mongoose.Document>;

    public initializeMongoDB() {
        this.initializeMongoEventHandler();
        this.connectMongo();
        this.configureModels();
    }

    private initializeMongoEventHandler() {
        mongoose.connection.on('connecting', () => console.log(` MongoDB ----------------> Connecting`));
        mongoose.connection.on('connected', () => console.log(` MongoDB ----------------> Connection successfully`));
        mongoose.connection.on('open', () => console.log(` MongoDB ----------------> Connection open`));
        mongoose.connection.on('reconnected', () => console.log(` MongoDB ----------------> Reconnecting`));
        mongoose.connection.on('disconnected', () => console.log(` MongoDB ----------------> Disconnected`));
        mongoose.connection.on('error', (error: any) => console.log(` MongoDB ----------------> Connection to mongo failed. Errors: [${error}]`));

        process.on('SIGINT', () => {
            mongoose.connection.close(() => console.log(` MongoDB ----------------> Disconnecting by finishing application`));
            process.exit(0);
        });
    }

    private connectMongo() {
        try {
            mongoose.connect(connectionString);
        }
        catch (err: any) {
            console.log(` MongoDB ----------------> Connection failed. Errors:[${err.toString()}]`);
            console.log(` MongoDB ----------------> Initializing reconnection process in 5 seconds`);
            setTimeout(this.connectMongo, 5000);
        }
    }

    private configureModels() {
        MongoDB.Opportunities = require('../models/opportunities')(mongoose);
    }
}