import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { QuizService } from '../../services/quiz.service';
import { defautTime, questions } from '../../utils/mockData';
import { BehaviorSubject } from 'rxjs';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizService: QuizService;
  const mockUserInfo = { name: 'User', selectedCategoryId: 1 };
  const mockQuestions = questions;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [QuizService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);

    spyOn(quizService, 'getQuestions').and.returnValue(mockQuestions);
    spyOn(quizService, 'getUserInfo').and.returnValue(new BehaviorSubject(mockUserInfo));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct state', () => {
    expect(component.currentQuestionIndex).toBe(0);
    expect(component.selectedAnswer).toBeNull();
    expect(component.isAnswered).toBeFalse();
    expect(component.timeRemaining).toBe(defautTime);
  });

  it('should load questions on init', () => {
    expect(component.questions).toEqual(mockQuestions);
  });

  it('should select answer correctly', () => {
    const submitSpy = spyOn(quizService, 'submitAnswer');
    component.selectAnswer(1);

    expect(component.selectedAnswer).toBe(1);
    expect(component.isAnswered).toBeTrue();
    expect(submitSpy).toHaveBeenCalledWith(0, 1);
  });

  it('should move to next question correctly', () => {
    const nextSpy = spyOn(quizService, 'nextQuestion');
    component.selectAnswer(1);
    component.nextQuestion();

    expect(component.currentQuestionIndex).toBe(1);
    expect(component.selectedAnswer).toBeNull();
    expect(component.isAnswered).toBeFalse();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should get current question', () => {
    expect(component.currentQuestion).toEqual(mockQuestions[0]);
    component.currentQuestionIndex = 1;
    expect(component.currentQuestion).toEqual(mockQuestions[1]);
  });
});
