import { Categories, Question } from "../models/quiz.model";

export const categories: Categories = {
    'geography': { id: 1, name: 'Geography' },
    'history': { id: 2, name: 'History' }
};

export const questions: Question[] = [
    {
        id: 1,
        question: 'What is the capital of France?',
        choices: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
        categoryId: 1
    },
    {
        id: 2,
        question: 'Who painted the Mona Lisa?',
        choices: ['Van Gogh', 'Leonardo da Vinci', 'Picasso', 'Rembrandt'],
        correctAnswer: 1,
        categoryId: 2
    },
    {
        id: 3,
        question: 'What is the capital of India?',
        choices: ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai'],
        correctAnswer: 1,
        categoryId: 1
    },
];