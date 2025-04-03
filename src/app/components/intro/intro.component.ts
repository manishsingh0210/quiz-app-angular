import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-intro',
  imports: [CommonModule, FormsModule],
  templateUrl: './intro.component.html'
})
export class IntroComponent {
  userName = 'Notified User';
  selectedCategory = 'Geography';
  categories: string[] = ['Geography', 'History', 'Science'];

  constructor() {

  }

  startQuiz(): void {
    // First set the user info
    // Move to the first question
  }
}
