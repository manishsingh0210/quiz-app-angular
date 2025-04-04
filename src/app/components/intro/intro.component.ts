import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-intro',
  imports: [CommonModule, FormsModule],
  templateUrl: './intro.component.html'
})
export class IntroComponent {
  userName: string = '';

  selectedCategoryId: number = 0;

  categories: { id: number; name: string; }[] = [];

  private userInfoSubscription?: Subscription;

  constructor(private router: Router, private quizService: QuizService) {
    this.categories = this.quizService.getCategories();
    this.userInfoSubscription = this.quizService.getUserInfo().subscribe(info => {
      this.userName = info.name;
      this.selectedCategoryId = info.selectedCategoryId;
    });
  }

  ngOnDestroy(): void {
    this.userInfoSubscription?.unsubscribe();
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
