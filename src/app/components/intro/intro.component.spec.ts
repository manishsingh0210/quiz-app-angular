import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroComponent } from './intro.component';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';

describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;
  let quizService: QuizService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroComponent, FormsModule],
      providers: [QuizService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories[0].name).toBeTruthy();
  });

  it('should initialize with default form values', () => {
    expect(component.userName).toBe('Notified User');
    expect(component.selectedCategoryId).toBe(1);
  });

  it('should enable start button when form is valid', () => {
    component.userName = 'User';
    component.selectedCategoryId = 1;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

  it('should enable start button when form is invalid', () => {
    component.userName = '';
    component.selectedCategoryId = 0;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should start quiz with valid form data', () => {
    const serviceSpy = spyOn(quizService, 'setUserInfo');

    component.userName = 'User';
    component.selectedCategoryId = 1;
    component.startQuiz();

    expect(serviceSpy).toHaveBeenCalledWith({
      name: 'User',
      selectedCategoryId: 1
    });
  });
});
