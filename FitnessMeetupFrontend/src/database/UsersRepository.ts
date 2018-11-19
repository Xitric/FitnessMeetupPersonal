import {Request, TYPES} from "tedious";
import context from "./DatabaseContext";
import User from "./models/User";

class UsersRepository {

    public async getUser(id: number): Promise<User> {
        let userRequest = new Request('select * from [User] where [userId] = @id', () => undefined);
        userRequest.addParameter('id', TYPES.VarChar, id);

        let rows = await context.execute(userRequest);
        if (rows.length === 1) {
            let user = new User();
            user.id = rows[0].userId;
            user.name = rows[0].name;
            user.email = rows[0].email;

            return user;
        }

        return null;
    }

    public async getUsers(ids: number[]): Promise<User[]> {
        let userRequest = new Request('select * from [User] where [userId] in ('
            + UsersRepository.generateIdParameters(ids.length)
            + ')', () => undefined);

        ids.forEach((item, index) => {
            userRequest.addParameter('id' + index, TYPES.VarChar, item);
        });

        let rows = await context.execute(userRequest);

        return rows.map(row => {
            let user = new User();
            user.id = row.userId;
            user.name = row.name;
            user.email = row.email;
            return user;
        });
    }

    private static generateIdParameters(count: number): string {
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

export default new UsersRepository();
