"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tedious_1 = require("tedious");
const DatabaseContext_1 = require("./DatabaseContext");
const User_1 = require("./models/User");
class UsersRepository {
    getUser(id) {
        let userRequest = new tedious_1.Request('select * from [User] where userId = @id', () => { });
        userRequest.addParameter('id', tedious_1.TYPES.VarChar, id);
        return new Promise((resolve, reject) => {
            DatabaseContext_1.default.execute(userRequest, rows => {
                if (rows.length === 1) {
                    let user = new User_1.default();
                    user.id = rows[0].userId;
                    user.name = rows[0].name;
                    user.email = rows[0].email;
                    resolve(user);
                }
                else {
                    reject(new Error('User with specified id not found'));
                }
            });
        });
    }
    getUsers(ids) {
        let userRequest = new tedious_1.Request('select * from [User] where userId in ('
            + this.generateIdParameters(ids.length)
            + ')', () => { });
        ids.forEach((item, index) => {
            userRequest.addParameter('id' + index, tedious_1.TYPES.VarChar, item);
        });
        return new Promise(resolve => {
            DatabaseContext_1.default.execute(userRequest, rows => {
                let users = [];
                rows.forEach(row => {
                    let user = new User_1.default();
                    user.id = row.userId;
                    user.name = row.name;
                    user.email = row.email;
                    users.push(user);
                });
                resolve(users);
            });
        });
    }
    generateIdParameters(count) {
        let idParameters = '';
        for (let i = 0; i < count; i++) {
            if (i != 0) {
                idParameters += ', ';
            }
            idParameters += '@id' + i;
        }
        console.log(idParameters);
        return idParameters;
    }
}
exports.default = new UsersRepository();
//# sourceMappingURL=UsersRepository.js.map