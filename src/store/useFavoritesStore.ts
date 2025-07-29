import { create } from "zustand";

interface FavoritesStore {
    favoriteIds: string[];
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    setFavorites: (ids: string[]) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
    favoriteIds: JSON.parse(localStorage.getItem("favorites") || "[]"),

    addFavorite: (id) =>
        set((state) => {
        const updated = [...state.favoriteIds, id];
        localStorage.setItem("favorites", JSON.stringify(updated));
        return { favoriteIds: updated };
        }),

    removeFavorite: (id) =>
        set((state) => {
        const updated = state.favoriteIds.filter((favId) => favId !== id);
        localStorage.setItem("favorites", JSON.stringify(updated));
        return { favoriteIds: updated };
        }),

    setFavorites: (ids) => {
        localStorage.setItem("favorites", JSON.stringify(ids));
        set({ favoriteIds: ids });
    },
}));