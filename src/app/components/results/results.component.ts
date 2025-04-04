import { Component } from '@angular/core';
import { Question, QuizState, UserInfo } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  questions: Question[] = [];

  quizState!: QuizState;

  userInfo!: UserInfo;

  private userInfoSubscription?: Subscription;

  private stateSubscription?: Subscription;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.stateSubscription = this.quizService.getCurrentState().subscribe(state => {
      this.quizState = state;
    });

    this.userInfoSubscription = this.quizService.getUserInfo().subscribe(info => {
      this.userInfo = info;
      this.questions = this.quizService.getQuestions(info.selectedCategoryId);
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription?.unsubscribe();
    this.userInfoSubscription?.unsubscribe();
  }

  restartQuiz() { }
}
