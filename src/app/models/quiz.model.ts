export interface Category {
    id: number;
    name: string;
}

export interface Categories {
    [key: string]: Category;
}

export interface Question {
    id: number;
    question: string;
    choices: string[];
    correctAnswer: number;
    categoryId: number;
}

export interface QuizState {
    currentQuestionIndex: number;
    answers: number[];
    score: number;
    timeRemaining: number;
    selectedCategoryId: number;
}

export interface UserInfo {
    name: string;
    selectedCategoryId: number;
}