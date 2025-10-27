import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'steady-guided-prompts',
  templateUrl: './guided-prompts.component.html',
  styleUrl: './guided-prompts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidedPromptsComponent {}
