"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tedious_1 = require("tedious");
class DatabaseContext {
    constructor() {
        this.config = {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER,
            options: {
                database: process.env.DB_DATABASE,
                encrypt: true,
                rowCollectionOnRequestCompletion: true
            }
        };
    }
    execute(request, callback) {
        const connection = new tedious_1.Connection(this.config);
        let rows = [];
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
exports.default = new DatabaseContext();
//# sourceMappingURL=DatabaseContext.js.map