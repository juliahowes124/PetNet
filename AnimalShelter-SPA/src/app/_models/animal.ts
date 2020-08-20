import { Photo } from './photo';

export interface Animal {
    id: number;
    name: string;
    species: string;
    breed: string;
    description: string;
    adoptionFee: number;
    likes: string[];
    qualities: string[];
    goodWith: string[];
    ageYears: number;
    ageMonths: number;
    gender: string;
    posted: Date;
    adoptBy: Date;
    views: number;
    saves: number;
    inquiries: number;
    city: string;
    state: string;
    userId: number;
    username: string;
    userKnownAs: string;
    userPhotoUrl: string;
    photoUrl: string;
    photos?: Photo[];
    savers: number[];
    adopted: boolean;
}

