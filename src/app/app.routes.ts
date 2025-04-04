import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: IntroComponent
    },
    {
        path: 'quiz',
        component: QuizComponent
    },
    {
        path: 'results',
        component: ResultsComponent
    }
];
