import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { QuizService } from '../../services/quiz.service';
import { questions } from '../../utils/mockData';
import { Question } from '../../models/quiz.model';
import { BehaviorSubject } from 'rxjs';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let quizService: QuizService;
  const mockQuizState = {
    currentQuestionIndex: 2,
    answers: [0],
    score: 2,
    totalTime: 300,
    timeRemaining: 180,
    selectedCategoryId: 1
  };

  const mockUserInfo = {
    name: 'User',
    selectedCategoryId: 1
  };

  const mockQuestions: Question[] = questions;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [QuizService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);

    spyOn(quizService, 'getCurrentState').and.returnValue(new BehaviorSubject(mockQuizState));
    spyOn(quizService, 'getUserInfo').and.returnValue(new BehaviorSubject(mockUserInfo));
    spyOn(quizService, 'getQuestions').and.returnValue(mockQuestions);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load quiz state and user info on init', () => {
    expect(component.quizState).toEqual(mockQuizState);
    expect(component.userInfo).toEqual(mockUserInfo);
    expect(component.questions).toEqual(mockQuestions);
  });

  it('should display correct score', () => {
    const scoreElement = fixture.nativeElement.querySelector('.text-lg');
    expect(scoreElement.textContent).toContain('2 out of 3');
  });

  it('should display user name', () => {
    const nameElement = fixture.nativeElement.querySelector('h3');
    expect(nameElement.textContent).toContain('User');
  });

  it('should display time taken', () => {
    const timeElement = fixture.nativeElement.querySelector('.text-gray-600');
    expect(timeElement.textContent).toContain('Time taken: 02:00');
  });
});
