//A class to provide helper methods for more easily using the generated api code
import {MeetupsApi, SportsApi, UsersApi} from "./api/apis";

export class ApiFactory {

    public static createMeetupsApi(accessToken?: string): MeetupsApi {
        let meetups = new MeetupsApi(process.env.BACKEND_API);
        if (accessToken) meetups.accessToken = accessToken;
        return meetups;
    }

    public static createSportsApi(accessToken?: string): SportsApi {
        let sports = new SportsApi(process.env.BACKEND_API);
        if (accessToken) sports.accessToken = accessToken;
        return sports;
    }

    public static createUsersApi(accessToken?: string): UsersApi {
        let users = new UsersApi(process.env.BACKEND_API);
        if (accessToken) users.accessToken = accessToken;
        return users;
    }
}