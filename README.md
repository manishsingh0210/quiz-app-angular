# Quiz Notified

Quiz application that presents multiple-choice questions to the user and scores them at the end.

## Features

- **Introduction Page:** Provides a form for users to enter their name and select a category. Displays the quiz rules.

- **Quiz Page:** Displays a series of multiple-choice questions and allows users to select the correct answer.

- **Results Page:** Displays the user's score and provides an option to retry the quiz. The user can also review their answers and correct answers.

- **Timer for entire quiz:** Keeps track of the time remaining for the entire quiz.

![Introduction page](/src/assets/images/intro-page.png)

![Quiz page](/src/assets/images/quiz-page.png)

# Project Setup Guide

This guide provides step-by-step instructions for downloading and running the project.

## Prerequisites

Node.js and npm: Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](nodejs.org).

Angular CLI: Install the Angular CLI globally using npm:

```bash
npm install -g @angular/cli
```

## Setup Instructions

**Step 1**: Clone the Repository

1. Open a Terminal or Command Prompt.
2. Navigate to the directory where you want to download the project.
3. Clone the repository using the following command:

```bash
git clone https://github.com/manishsingh0210/quiz-app-angular.git
```

**Step 2**: Install Project Dependencies
Navigate into the cloned project directory:

```bash
cd quiz-app-angular
```

Install the project dependencies:

```bash
npm install
```

**Step 3**: Run the Angular Project
Run the Angular application using the Angular CLI:

```bash
ng serve
```

**Contributing**
Contributions are welcome! If you have any suggestions or improvements, please submit a pull request.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running test coverage

To run test coverage, use the following command:

```bash
ng test --no-watch --code-coverage
```

## Additional Resources

[Tailwind CSS](https://v1.tailwindcss.com/)

[Tailwind CSS Changes from v3 to v4](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3)
