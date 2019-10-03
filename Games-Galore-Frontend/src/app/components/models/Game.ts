export class Game{
    id: number;
    cover : {
        id : number;
        url: string;
    }
    genres : number[];
    name: string;
    platforms: number[];
    summary: string;
}