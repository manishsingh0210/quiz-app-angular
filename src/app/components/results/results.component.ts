import { Component } from '@angular/core';
import { Question, QuizState, UserInfo } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { ReviewAnswersComponent } from "../review-answers/review-answers.component";

@Component({
  selector: 'app-results',
  imports: [TimeFormatPipe, ReviewAnswersComponent],
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  questions: Question[] = [];

  quizState!: QuizState;

  userInfo!: UserInfo;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private navigate: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getCurrentState().
      pipe(
        takeUntil(this.destroy$)
      ).
      subscribe(state => {
        this.quizState = state;
      });

    this.quizService.getUserInfo().
      pipe(
        take(1)
      ).
      subscribe(info => {
        this.userInfo = info;
        this.questions = this.quizService.getQuestions(info.selectedCategoryId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  restartQuiz() {
    this.quizService.resetQuiz();
    this.navigate.navigate(['']);
  }
}
