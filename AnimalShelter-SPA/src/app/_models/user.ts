import { UserPhoto } from './userPhoto';


export interface User {
    id: number;
    username: string;
    knownAs: string;
    city: string;
    state: string;
    lastActive: Date;
    profilePictureUrl: string;
    profilePicture: UserPhoto[];
}
