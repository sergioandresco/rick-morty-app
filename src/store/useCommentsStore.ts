import { create } from "zustand";

interface Comment {
    id: string;
    text: string;
    date: string;
}

interface CommentsStore {
    comments: {
        [characterId: string]: Comment[];
    };
    addComment: (characterId: string, commentText: string) => void;
    removeComment: (characterId: string, commentId: string) => void;
    getComments: (characterId: string) => Comment[];
    loadFromStorage: () => void;
}

const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const loadCommentsFromStorage = (): { [characterId: string]: Comment[] } => {
    try {
        const stored = localStorage.getItem("comments-storage");
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

const saveCommentsToStorage = (comments: { [characterId: string]: Comment[] }) => {
    try {
        localStorage.setItem("comments-storage", JSON.stringify(comments));
    } catch {
        console.error("Error saving comments to localStorage");
    }
};

export const useCommentsStore = create<CommentsStore>((set, get) => ({
    comments: {},
    
    loadFromStorage: () => {
        const storedComments = loadCommentsFromStorage();
        set({ comments: storedComments });
    },
    
    addComment: (characterId, commentText) => {
        const newComment = {
            id: generateId(),
            text: commentText,
            date: new Date().toISOString(),
        };

        set((state) => {
            const updatedComments = {
                ...state.comments,
                [characterId]: [...(state.comments[characterId] || []), newComment],
            };
            
            saveCommentsToStorage(updatedComments);
            
            return { comments: updatedComments };
        });
    },

    removeComment: (characterId, commentId) => {
        set((state) => {
            const currentComments = state.comments[characterId] || [];
            const filteredComments = currentComments.filter(comment => comment.id !== commentId);
            
            const updatedComments = {
                ...state.comments,
                [characterId]: filteredComments,
            };
            
            saveCommentsToStorage(updatedComments);
            
            return { comments: updatedComments };
        });
    },

    getComments: (characterId) => {
        return get().comments[characterId] || [];
    },
}));

if (typeof window !== 'undefined') {
    useCommentsStore.getState().loadFromStorage();
}