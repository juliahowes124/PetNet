import { Photo } from './photo';

export interface Animal {
    id: number;
    name: string;
    species: string;
    breed: string;
    description: string;
    adoptionFee: number;
    likes: string;
    qualities: string;
    goodWith: string;
    age: number;
    gender: string;
    posted: Date;
    timeLeftToAdopt: Date;
    views: number;
    saves: number;
    inquiries: number;
    city: string;
    state: string;
    userId: number;
    photoUrl: string;
    photos?: Photo[];
}
