import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Question, QuizState } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-review-answers',
  imports: [CommonModule],
  templateUrl: './review-answers.component.html',
})
export class ReviewAnswersComponent {
  @Input() questions: Question[] = [];

  @Input() quizState!: QuizState;

  constructor() { }
}
