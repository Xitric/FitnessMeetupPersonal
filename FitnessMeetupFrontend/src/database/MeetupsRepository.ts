import {Request, TYPES} from 'tedious';
import context from './DatabaseContext';
import Meetup from './models/Meetup';
import users from './UsersRepository';
import User from "./models/User";

class MeetupsRepository {

    public async getMeetup(id: number): Promise<Meetup> {
        let meetupRequest = new Request('select * from [Meetup] where [meetupId] = @id', () => undefined);
        meetupRequest.addParameter('id', TYPES.VarChar, id);

        let rows = await context.execute(meetupRequest);
        if (rows.length === 1) {
            let meetup = new Meetup();
            meetup.id = rows[0].meetupId;
            meetup.title = rows[0].title;
            meetup.description = rows[0].description;
            meetup.location = rows[0].location;
            meetup.date = rows[0].date;
            meetup.sport = rows[0].sport;

            return this.addUsersToMeetup(meetup, rows[0].owner)
        }

        return null;
    }

    private async addUsersToMeetup(meetup: Meetup, ownerId: number): Promise<Meetup> {
        meetup.owner = await users.getUser(ownerId);
        meetup.participants = await this.getParticipants(meetup.id);
        return meetup;
    }

    public async getParticipants(id: number): Promise<User[]> {
        let participantsRequest = new Request('select [userId] from [Participant] where [meetupId] = @id', () => undefined);
        participantsRequest.addParameter('id', TYPES.VarChar, id);

        let participantIds = await context.execute(participantsRequest);
        return users.getUsers(participantIds.map(p => p.userId));
    }
}


export default new MeetupsRepository();
