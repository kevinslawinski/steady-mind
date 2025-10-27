import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { APP_TITLE } from '../../../../globals/app.constants';

@Component({
  selector: 'steady-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly appTitle = signal(APP_TITLE);
  protected readonly toggleTheme = output<void>();
  protected readonly toggleMenu = output<void>();
}
