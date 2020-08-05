import { Photo } from './photo';

export interface Animal {
    id: number;
    name: string;
    species: string;
    description: string;
    age: number;
    gender: string;
    posted: Date;
    timeLeftToAdopt: Date;
    city: string;
    state: string;
    photoUrl: string;
    photos?: Photo[];
}
