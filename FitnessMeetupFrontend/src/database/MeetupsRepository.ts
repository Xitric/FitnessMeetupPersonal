import {Request, TYPES} from 'tedious';
import context from './DatabaseContext';
import Meetup from './models/Meetup';
import users from './UsersRepository';
import User from "./models/User";

class MeetupsRepository {

    public getMeetup(id: number): Promise<Meetup> {
        let meetupRequest = new Request('select * from [Meetup] where [meetupId] = @id', () => {});
        meetupRequest.addParameter('id', TYPES.VarChar, id);

        return new Promise<Meetup>((resolve, reject) => {
            context.execute(meetupRequest, rows => {
                if (rows.length === 1) {
                    let meetup: Meetup = new Meetup();
                    meetup.id = rows[0].meetupId;
                    meetup.title = rows[0].title;
                    meetup.description = rows[0].description;
                    meetup.location = rows[0].location;
                    meetup.date = rows[0].date;
                    meetup.sport = rows[0].sport;

                    users.getUser(rows[0].owner).then(owner => {
                        meetup.owner = owner;

                        this.getParticipants(meetup.id).then(participants => {
                           meetup.participants = participants;
                           resolve(meetup);
                        });
                    });
                } else {
                    reject(new Error('Meetup with the specified id not found'));
                }
            });
        });
    }

    public getParticipants(id: number): Promise<User[]> {
        let participantsRequest = new Request('select [userId] from [Participant] where [meetupId] = @id', () => {});
        participantsRequest.addParameter('id', TYPES.VarChar, id);

        return new Promise<User[]>(resolve => {
            context.execute(participantsRequest, rows => {
                users.getUsers(rows.map(row => row.userId)).then(users => {
                    resolve(users);
                });
            });
        });
    }
}



export default new MeetupsRepository();
