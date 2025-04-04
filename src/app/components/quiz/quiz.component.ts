import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/quiz.model';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, TimeFormatPipe],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: Question[] = [];

  currentQuestionIndex: number = 0;

  selectedAnswer: number | null = null;

  isAnswered: boolean = false;

  timeRemaining: number = 0;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getUserInfo().
      pipe(
        takeUntil(this.destroy$)
      ).subscribe(info => {
        this.questions = this.quizService.getQuestions(info.selectedCategoryId);
      });

    this.quizService.getCurrentState().
      pipe(
        take(1)
      ).subscribe(state => {
        this.timeRemaining = state.timeRemaining;
        this.startTimer();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.destroy$.next();
    this.destroy$.complete();
    this.router.navigate(['results']);
  }

  private startTimer(): void {
    interval(1000).
      pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
          this.quizService.updateTimer(this.timeRemaining);
        } else {
          this.finishQuiz();
        }
      });
  }
}
