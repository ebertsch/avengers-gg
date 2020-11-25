import { Collection } from 'fireorm';

@Collection("short-urls")
export class ShortUrls {
    id: string
}