export class Wishlist {
    wishlitId: number;
    wishlistName: string;
    wishlistGames: {
        gameId: number;
        gameName: string;
    }
    wishlistAccount: {
        accountId : number;
        accountImageUrl: string;
        accountPassword : string;
        accountUser : {
            userEmail : string;
            userFirstName: string;
            userId: number;
        }
        accountUsername: number;
    }

}