import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_TITLE } from '../../../../globals/app.constants';

@Component({
  selector: 'steady-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class NavigationComponent {
  readonly isOpen = input<boolean>(false);
  readonly closeNav = output<void>();

  protected readonly appTitle = signal(APP_TITLE);

  protected readonly navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/guided-prompts', label: 'Guided Support', icon: '💬' },
    { path: '/coping-library', label: 'Coping Library', icon: '📚' },
    { path: '/crisis-resources', label: 'Crisis Resources', icon: '🆘' },
  ];
}
