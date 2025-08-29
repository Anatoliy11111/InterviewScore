import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// Типы
type Ratings = {
    [category: string]: {
        [questionIndex: number]: number;
    };
};

interface InterviewState {
    candidateName: string;
    ratings: Ratings;
    aiReport: string;
    setCandidateName: (name: string) => void;
    setRating: (category: string, questionIndex: number, value: number) => void;
    setAIReport: (report: string) => void;
    reset: () => void;
}

// Store
export const useInterviewStore = create<InterviewState>()(
    persist(
        (set) => ({
            candidateName: '',
            ratings: {},
            aiReport: '',

            setCandidateName: (name) => set({candidateName: name}),

            setRating: (category, questionIndex, value) =>
                set((state) => ({
                    ratings: {
                        ...state.ratings,
                        [category]: {
                            ...state.ratings[category],
                            [questionIndex]: value,
                        },
                    },
                })),

            setAIReport: (report) => set({aiReport: report}),

            reset: () => set({
                candidateName: '',
                ratings: {},
                aiReport: '',
            }),
        }),
        {
            name: 'interview-storage',
        }
    )
);