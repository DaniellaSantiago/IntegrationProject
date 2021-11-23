import express from "express";
import Routes from "../routes";
import mongodb from "../database/mongoConnect";

export default class App {
    app: express.Express;
    mongodb: mongodb = new mongodb();

    constructor() {
        this.app = express()
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/api', new Routes().getRoutes());
        this.mongodb.initializeMongoDB();
    }

    public getApp(): express.Express {
        return this.app
    }

    public setApp(key: string, value: any): void {
        this.app.set(key, value);
    }
}