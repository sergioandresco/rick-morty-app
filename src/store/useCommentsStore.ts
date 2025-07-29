import { create } from "zustand";

interface Comment {
  text: string;
  date: string;
}

interface CommentsStore {
  comments: {
    [characterId: string]: Comment[];
  };
  addComment: (characterId: string, commentText: string) => void;
}

export const useCommentsStore = create<CommentsStore>((set) => ({
  comments: JSON.parse(localStorage.getItem("comments") || "{}"),

  addComment: (characterId, commentText) =>
    set((state) => {
      const newComment = {
        text: commentText,
        date: new Date().toISOString(),
      };
      const updated = {
        ...state.comments,
        [characterId]: [
          ...(state.comments[characterId] || []),
          newComment,
        ],
      };
      localStorage.setItem("comments", JSON.stringify(updated));
      return { comments: updated };
    }),
}));