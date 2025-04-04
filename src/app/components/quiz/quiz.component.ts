import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/quiz.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: Question[] = [];

  currentQuestionIndex = 0;

  selectedAnswer: number | null = null;

  isAnswered = false;

  timeRemaining = 300; // 5 minutes in seconds

  private stateSubscription?: Subscription;

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.stateSubscription = this.quizService.getUserInfo().subscribe(info => {
      this.questions = this.quizService.getQuestions(info.selectedCategoryId);
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription?.unsubscribe();
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(index: number): void {
    this.selectedAnswer = index;
    this.isAnswered = true;
    this.quizService.submitAnswer(this.currentQuestionIndex, index);
  }

  nextQuestion(): void {
    this.quizService.nextQuestion();
    this.currentQuestionIndex++;
    this.selectedAnswer = null;
    this.isAnswered = false;
  }

  finishQuiz(): void {
    this.router.navigate(['results']);
  }
}
