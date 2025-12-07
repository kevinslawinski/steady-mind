import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'steady-coping-library',
  templateUrl: './coping-library.component.html',
  styleUrl: './coping-library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopingLibraryComponent {}
