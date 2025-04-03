import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { IntroComponent } from "./components/intro/intro.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, IntroComponent],
  template: `
    <app-header></app-header>
    <app-intro></app-intro>
  `,
  styles: ``,
})
export class AppComponent {
  title = 'quiz-app';
}
