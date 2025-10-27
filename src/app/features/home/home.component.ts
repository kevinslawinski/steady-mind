import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_TITLE, WELCOME_TEXT } from '../../../globals/app.constants';

@Component({
  selector: 'steady-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HomeComponent {
  protected readonly appTitle = signal(APP_TITLE);
  protected readonly currentQuestion = signal(0);
  protected readonly selectedAnswer = signal<string | null>(null);
  protected readonly welcomeText = signal(WELCOME_TEXT);

  // Initial guided questions
  protected readonly questions = [
    {
      id: 0,
      question: 'How are you feeling right now?',
      options: [
        { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😰' },
        { value: 'anxious', label: 'Anxious', emoji: '😥' },
        { value: 'sad', label: 'Sad', emoji: '😢' },
        { value: 'stressed', label: 'Stressed', emoji: '😣' },
        { value: 'neutral', label: 'Just checking in', emoji: '😊' },
      ],
    },
    {
      id: 1,
      question: 'What would be most helpful right now?',
      options: [
        { value: 'calm-down', label: 'Something to help me calm down', emoji: '🌊' },
        { value: 'ground', label: 'Help me feel grounded', emoji: '🌱' },
        { value: 'distract', label: 'A gentle distraction', emoji: '✨' },
        { value: 'breathe', label: 'Breathing exercises', emoji: '💨' },
        { value: 'explore', label: 'Just want to explore', emoji: '🧭' },
      ],
    },
  ];

  protected selectAnswer(value: string): void {
    this.selectedAnswer.set(value);
  }

  protected nextQuestion(): void {
    const current = this.currentQuestion();
    if (current < this.questions.length - 1) {
      this.currentQuestion.update((q) => q + 1);
      this.selectedAnswer.set(null);
    } else {
      // Navigate to results/recommendations
      // TODO: Implement recommendation logic
      console.log('Show recommendations based on answers');
    }
  }

  protected previousQuestion(): void {
    if (this.currentQuestion() > 0) {
      this.currentQuestion.update((q) => q - 1);
      this.selectedAnswer.set(null);
    }
  }
}
