import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_TITLE } from '../../../globals/app.constants';

@Component({
  selector: 'steady-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HomeComponent {
  protected readonly appTitle = signal(APP_TITLE);

  protected readonly quickActions = [
    {
      title: 'Guided Support',
      description: 'Answer a few gentle questions to find techniques that might help right now',
      icon: '💬',
      route: '/guided-prompts',
      color: 'primary',
    },
    {
      title: 'Coping Library',
      description: 'Browse our collection of grounding techniques and coping mechanisms',
      icon: '📚',
      route: '/coping-library',
      color: 'secondary',
    },
    {
      title: 'Crisis Resources',
      description: 'Access immediate help and professional support resources',
      icon: '🆘',
      route: '/crisis-resources',
      color: 'accent',
      urgent: true,
    },
  ];
}
