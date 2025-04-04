import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { take } from 'rxjs/operators';
import { quizRules } from '../../utils/mockData';

@Component({
  selector: 'app-intro',
  imports: [CommonModule, FormsModule],
  templateUrl: './intro.component.html'
})
export class IntroComponent {
  userName: string = '';

  selectedCategoryId: number = 0;

  categories: { id: number; name: string; }[] = [];

  quizRules: string[] = quizRules;

  constructor(private router: Router, private quizService: QuizService) {
    this.categories = this.quizService.getCategories();
    this.quizService.getUserInfo().
      pipe(
        take(1)
      ).subscribe(info => {
        this.userName = info.name;
        this.selectedCategoryId = info.selectedCategoryId;
      });
  }

  ngOnDestroy(): void {
    //clean up
  }

  startQuiz(): void {
    // First set the user info
    this.quizService.setUserInfo({
      name: this.userName,
      selectedCategoryId: Number(this.selectedCategoryId)
    });

    // Move to the first question
    this.router.navigate(['quiz']);
  }
}
