import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { defautTime } from '../utils/mockData';

describe('QuizService', () => {
    let service: QuizService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [QuizService]
        });
        service = TestBed.inject(QuizService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return correct categories', () => {
        const categories = service.getCategories();
        expect(categories.length).toBe(2);
        expect(categories[0].name).toBe('Geography');
        expect(categories[1].name).toBe('History');
    });

    it('should filter questions by category', () => {
        const geographyQuestions = service.getQuestions(1);
        expect(geographyQuestions.length).toBeGreaterThan(0);
        expect(geographyQuestions.every(q => q.categoryId === 1)).toBeTrue();
    });

    it('should initialize with default state', () => {
        service.getCurrentState().subscribe(state => {
            expect(state.currentQuestionIndex).toBe(0);
            expect(state.answers).toEqual([]);
            expect(state.score).toBe(0);
            expect(state.totalTime).toBe(defautTime);
            expect(state.timeRemaining).toBe(defautTime);
            expect(state.selectedCategoryId).toBe(0);
        });
    });

    it('should set user info correctly', () => {
        const testInfo = { name: 'User', selectedCategoryId: 1 };
        service.setUserInfo(testInfo);

        service.getUserInfo().subscribe(info => {
            expect(info).toEqual(testInfo);
        });

        service.getCurrentState().subscribe(state => {
            expect(state.selectedCategoryId).toBe(1);
        });
    });

    it('should submit answer and calculate score correctly', () => {
        service.setUserInfo({ name: 'User', selectedCategoryId: 1 });
        service.submitAnswer(0, 2); // Correct answer for first question

        service.getCurrentState().subscribe(state => {
            expect(state.answers).toEqual([2]);
            expect(state.score).toBe(1);
        });
    });

    it('should handle next question correctly', () => {
        service.nextQuestion();

        service.getCurrentState().subscribe(state => {
            expect(state.currentQuestionIndex).toBe(1);
        });
    });

    it('should update timer correctly', () => {
        service.updateTimer(250);

        service.getCurrentState().subscribe(state => {
            expect(state.timeRemaining).toBe(250);
        });
    });

    it('should reset quiz state correctly', () => {
        service.setUserInfo({ name: 'User', selectedCategoryId: 1 });
        service.submitAnswer(0, 2);
        service.nextQuestion();
        service.updateTimer(250);

        service.resetQuiz();

        service.getCurrentState().subscribe(state => {
            expect(state.currentQuestionIndex).toBe(0);
            expect(state.answers).toEqual([]);
            expect(state.score).toBe(0);
            expect(state.totalTime).toBe(defautTime);
            expect(state.timeRemaining).toBe(defautTime);
            expect(state.selectedCategoryId).toBe(0); // Should maintain category
        });
    });

    it('should calculate score with single answers', () => {
        service.setUserInfo({ name: 'User', selectedCategoryId: 1 });
        service.submitAnswer(0, 2); // Correct

        service.getCurrentState().subscribe(state => {
            expect(state.score).toBe(1);
        });
    });

    it('should handle invalid category id', () => {
        const invalidQuestions = service.getQuestions(999);
        expect(invalidQuestions).toEqual([]);
    });
});