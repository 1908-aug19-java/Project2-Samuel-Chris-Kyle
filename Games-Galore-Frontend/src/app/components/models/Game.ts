export class Game {
    id: number;
    cover: {
        id: number;
        url: string;
    }
    genres: number[];
    name: string;
    platforms: number[];
    summary: string;
    popularity: number;
    url: string;
    genreName: string[];
    platformName: string[];
    genrePresent: boolean;
    platformPresent: boolean;
}