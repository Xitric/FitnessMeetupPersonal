import {Request, TYPES} from "tedious";
import context from "./DatabaseContext";
import User from "./models/User";

class UsersRepository {

    public getUser(id: number): Promise<User> {
        let userRequest = new Request('select * from [User] where [userId] = @id', () => {});
        userRequest.addParameter('id', TYPES.VarChar, id);

        return new Promise<User>((resolve, reject) => {
            context.execute(userRequest, rows => {
                if (rows.length === 1) {
                    let user: User = new User();
                    user.id = rows[0].userId;
                    user.name = rows[0].name;
                    user.email = rows[0].email;

                    resolve(user);
                } else {
                    reject(new Error('User with specified id not found'));
                }
            });
        });
    }

    public getUsers(ids: number[]): Promise<User[]> {
        let userRequest = new Request('select * from [User] where [userId] in ('
            + UsersRepository.generateIdParameters(ids.length)
            + ')', () => {});

        ids.forEach((item, index) => {
            userRequest.addParameter('id' + index, TYPES.VarChar, item);
        });

        return new Promise<User[]>(resolve => {
            context.execute(userRequest, rows => {
                let users: User[] = [];

                rows.forEach(row => {
                    let user: User = new User();
                    user.id = row.userId;
                    user.name = row.name;
                    user.email = row.email;
                    users.push(user);
                });

                resolve(users);
            });
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
        console.log(idParameters);
        return idParameters;
    }
}

export default new UsersRepository();
