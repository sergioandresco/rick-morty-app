export type Character = {
    character: {
        id: string;
        name: string;
        status: string;
        species: string;
        gender: string;
        image: string;
        origin?: { name: string };
        location?: { name: string };
    };
};

export type GetCharactersResponse = {
    characters: {
        results: Character[];
        info: {
            next: number | null;
            pages: number;
        };
    };
};