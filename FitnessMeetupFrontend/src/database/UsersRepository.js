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
const DatabaseContext_1 = require("./DatabaseContext");
const User_1 = require("./models/User");
class UsersRepository {
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRequest = new tedious_1.Request('select * from [User] where [userId] = @id', () => undefined);
            userRequest.addParameter('id', tedious_1.TYPES.VarChar, id);
            let rows = yield DatabaseContext_1.default.execute(userRequest);
            if (rows.length === 1) {
                let user = new User_1.default();
                user.id = rows[0].userId;
                user.name = rows[0].name;
                user.email = rows[0].email;
                return user;
            }
            return null;
        });
    }
    getUsers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRequest = new tedious_1.Request('select * from [User] where [userId] in ('
                + UsersRepository.generateIdParameters(ids.length)
                + ')', () => undefined);
            ids.forEach((item, index) => {
                userRequest.addParameter('id' + index, tedious_1.TYPES.VarChar, item);
            });
            let rows = yield DatabaseContext_1.default.execute(userRequest);
            return rows.map(row => {
                let user = new User_1.default();
                user.id = row.userId;
                user.name = row.name;
                user.email = row.email;
                return user;
            });
        });
    }
    static generateIdParameters(count) {
        let idParameters = '';
        for (let i = 0; i < count; i++) {
            if (i != 0) {
                idParameters += ', ';
            }
            idParameters += '@id' + i;
        }
        return idParameters;
    }
}
exports.default = new UsersRepository();
//# sourceMappingURL=UsersRepository.js.map