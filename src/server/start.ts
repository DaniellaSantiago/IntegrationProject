import App from ".";
import Server from "./server";

export default class startApplication {
    public static start(): void {
        console.log(` STARTING APPLICATION `);
        new Server("Integration", new App(), 5000).start();
    }
}

startApplication.start();