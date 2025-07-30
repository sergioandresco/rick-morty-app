export type GetFavoriteCharacters = {
    charactersByIds: {
        id: string;
        name: string;
        status: string;
        species: string;
        gender: string;
        image: string;
    }[];
};