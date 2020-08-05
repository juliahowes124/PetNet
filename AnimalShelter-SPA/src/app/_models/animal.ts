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
    photoUrl: string;
    photos?: Photo[];
}
