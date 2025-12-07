import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WELCOME_TEXT } from '../../../globals/app.constants';
import { GuidedPromptsComponent } from '../guided-prompts/guided-prompts.component';

@Component({
  selector: 'steady-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, GuidedPromptsComponent],
})
export class HomeComponent {
  protected readonly welcomeText = signal(WELCOME_TEXT);
}
