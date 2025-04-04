import { Injectable } from '@angular/core';
import { Categories, Question, QuizState, UserInfo } from '../models/quiz.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { categories, questions } from '../utils/mockData';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private categories: Categories = categories;

    private questions: Question[] = questions;

    private quizState = new BehaviorSubject<QuizState>({
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        timeRemaining: 300,
        selectedCategoryId: 0
    });

    private userInfo = new BehaviorSubject<UserInfo>({
        name: 'Notified User',
        selectedCategoryId: 1
    });

    constructor() { }

    getQuestions(categoryId: number): Question[] {
        return this.questions.filter(q => q.categoryId === categoryId);
    }

    getCategories(): { id: number; name: string }[] {
        return Object.values(this.categories);
    }

    getUserInfo(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    getCurrentState(): Observable<QuizState> {
        return this.quizState.asObservable();
    }

    setUserInfo(info: UserInfo): void {
        this.userInfo.next(info);
        const currentState = this.quizState.value;
        this.quizState.next({
            ...currentState,
            selectedCategoryId: info.selectedCategoryId
        });
    }

    submitAnswer(questionIndex: number, answerIndex: number): void {
        const currentState = this.quizState.value;
        const answers = [...currentState.answers];
        if (questionIndex >= 0) {
            answers[questionIndex] = answerIndex;
        }

        const score = this.calculateScore(answers);

        this.quizState.next({
            ...currentState,
            answers,
            score
        });
    }

    nextQuestion(): void {
        const currentState = this.quizState.value;
        this.quizState.next({
            ...currentState,
            currentQuestionIndex: currentState.currentQuestionIndex + 1
        });
    }

    private calculateScore(answers: number[]): number {
        const categoryQuestions = this.getQuestions(this.quizState.value.selectedCategoryId);
        return answers.reduce((score, answer, index) => {
            const question = categoryQuestions[index];
            return question && answer === question.correctAnswer ? score + 1 : score;
        }, 0);
    }
}