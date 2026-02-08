import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDED_QUESTIONS } from '../../../globals/app.constants';

@Component({
  selector: 'steady-guided-prompts',
  templateUrl: './guided-prompts.component.html',
  styleUrl: './guided-prompts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class GuidedPromptsComponent {
  protected readonly currentQuestion = signal(0);
  protected readonly selectedAnswer = signal<string | null>(null);

  // Use questions from constants
  protected readonly questions = GUIDED_QUESTIONS;

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
