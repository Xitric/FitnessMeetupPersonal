import User from './User';

export default class Meetup {
    id?: number;
    title?: string;
    description?: string;
    location?: string;
    date?: string;
    owner?: User;
    participants?: User[];
    sport?: string;
}
