"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tedious_1 = require("tedious");
const DatabaseContext_1 = require("./DatabaseContext");
const Meetup_1 = require("./models/Meetup");
const UsersRepository_1 = require("./UsersRepository");
class MeetupsRepository {
    getMeetup(id) {
        let meetupRequest = new tedious_1.Request('select * from [Meetup] where [meetupId] = @id', () => { });
        meetupRequest.addParameter('id', tedious_1.TYPES.VarChar, id);
        return new Promise((resolve, reject) => {
            DatabaseContext_1.default.execute(meetupRequest, rows => {
                if (rows.length === 1) {
                    let meetup = new Meetup_1.default();
                    meetup.id = rows[0].meetupId;
                    meetup.title = rows[0].title;
                    meetup.description = rows[0].description;
                    meetup.location = rows[0].location;
                    meetup.date = rows[0].date;
                    meetup.sport = rows[0].sport;
                    UsersRepository_1.default.getUser(rows[0].owner).then(owner => {
                        meetup.owner = owner;
                        this.getParticipants(meetup.id).then(participants => {
                            meetup.participants = participants;
                            resolve(meetup);
                        });
                    });
                }
                else {
                    reject(new Error('Meetup with the specified id not found'));
                }
            });
        });
    }
    getParticipants(id) {
        let participantsRequest = new tedious_1.Request('select [userId] from [Participant] where [meetupId] = @id', () => { });
        participantsRequest.addParameter('id', tedious_1.TYPES.VarChar, id);
        return new Promise(resolve => {
            DatabaseContext_1.default.execute(participantsRequest, rows => {
                UsersRepository_1.default.getUsers(rows.map(row => row.userId)).then(users => {
                    resolve(users);
                });
            });
        });
    }
}
exports.default = new MeetupsRepository();
//# sourceMappingURL=MeetupsRepository.js.map