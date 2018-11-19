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
const Meetup_1 = require("./models/Meetup");
const UsersRepository_1 = require("./UsersRepository");
class MeetupsRepository {
    getMeetup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let meetupRequest = new tedious_1.Request('select * from [Meetup] where [meetupId] = @id', () => undefined);
            meetupRequest.addParameter('id', tedious_1.TYPES.VarChar, id);
            let rows = yield DatabaseContext_1.default.execute(meetupRequest);
            if (rows.length === 1) {
                let meetup = new Meetup_1.default();
                meetup.id = rows[0].meetupId;
                meetup.title = rows[0].title;
                meetup.description = rows[0].description;
                meetup.location = rows[0].location;
                meetup.date = rows[0].date;
                meetup.sport = rows[0].sport;
                return this.addUsersToMeetup(meetup, rows[0].owner);
            }
            return null;
        });
    }
    addUsersToMeetup(meetup, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            meetup.owner = yield UsersRepository_1.default.getUser(ownerId);
            meetup.participants = yield this.getParticipants(meetup.id);
            return meetup;
        });
    }
    getParticipants(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let participantsRequest = new tedious_1.Request('select [userId] from [Participant] where [meetupId] = @id', () => undefined);
            participantsRequest.addParameter('id', tedious_1.TYPES.VarChar, id);
            let participantIds = yield DatabaseContext_1.default.execute(participantsRequest);
            return UsersRepository_1.default.getUsers(participantIds.map(p => p.userId));
        });
    }
}
exports.default = new MeetupsRepository();
//# sourceMappingURL=MeetupsRepository.js.map