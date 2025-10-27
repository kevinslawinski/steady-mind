import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { APP_TITLE } from '../globals/app.constants';
@Component({
  selector: 'steady-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ appTitle() }}!</h1>

    <router-outlet />
  `,
  styles: [],
})
export class App implements OnInit {
  private readonly tile = inject(Title);
  protected readonly appTitle = signal(APP_TITLE);

  ngOnInit() {
    this.tile.setTitle(this.appTitle());
  }
}
