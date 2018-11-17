import {Connection, ConnectionConfig, Request} from 'tedious';

class DatabaseContext {

    private config: ConnectionConfig = {
        userName: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        options: {
            database: process.env.DB_DATABASE,
            encrypt: true,
            rowCollectionOnRequestCompletion: true
        }
    };

    public execute(request: Request, callback: (rows: any[]) => void) {
        const connection = new Connection(this.config);
        let rows: any[] = [];

        request.on('row', function (columns) {
            let row = {};
            columns.forEach(column => {
                row[column.metadata.colName] = column.value;
            });
            rows.push(row);
        });

        request.on('requestCompleted', function () {
            connection.close();
            callback(rows);
        });

        connection.on('connect', function (err) {
            if (!err) {
                connection.execSql(request);
            }
        });
    }
}

export default new DatabaseContext();
