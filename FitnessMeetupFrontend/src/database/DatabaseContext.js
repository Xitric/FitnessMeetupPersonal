"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
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
                    resolve(rows);
                });
                connection.on('connect', function (err) {
                    if (!err) {
                        connection.execSql(request);
                    }
                });
            });
        });
    }
}
exports.default = new DatabaseContext();
//# sourceMappingURL=DatabaseContext.js.map