import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { APP_TITLE } from '../globals/app.constants';
import { HeaderComponent } from './core/layout/header/header.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'steady-root',
  imports: [RouterOutlet, HeaderComponent, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly titleService = inject(Title);
  private readonly themeService = inject(ThemeService);

  protected readonly appTitle = signal(APP_TITLE);
  protected readonly isNavOpen = signal(false);

  ngOnInit() {
    this.titleService.setTitle(this.appTitle());
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected toggleNav(): void {
    this.isNavOpen.update((isOpen) => !isOpen);
  }

  protected closeNav(): void {
    this.isNavOpen.set(false);
  }
}
