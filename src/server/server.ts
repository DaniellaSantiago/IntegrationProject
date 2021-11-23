import * as http from 'http';
import App from '.';

export default class Server {
    public static port: number;
    public static serverName: string;

    app: App;

    constructor(_serverName: string, _app: App, _port: number) {
        Server.port = _port;
        Server.serverName = _serverName;
        process.env.TZ = 'America/Sao_Paulo';
        this.app = _app;
        this.app.setApp('port', Server.port);
    }

    public start() {

        let server: any = http.createServer(this.app.getApp());
        server.listen(Server.port);
        server.keepAliveTimeout = 500 * 1000;
        server.headersTimeout = 550 * 1000;
        server.on('error', this.onErrorHandler);
        server.on('listening', this.onListeningHandler);
    }

    private onErrorHandler(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind: any;
        if (typeof Server.port === 'string') {
            bind = 'Pipe ' + Server.port;
        }
        else {
            bind = 'Port ' + Server.port;
        }

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requer privilégios elevados');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' [PORTA] já está em uso');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListeningHandler() {
        console.log(` Application ------------> ${Server.serverName}`);
        console.log(` Status da aplicação ----> ONLINE`);
        console.log(` Porta ------------------> ${Server.port}`);
        console.log(` Rota -------------------> localhost:5000/api`);
        console.log(` AMBIENTE ---------------> LOCALHOST `);
    }
}