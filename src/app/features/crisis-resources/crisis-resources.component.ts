import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'steady-crisis-resources',
  templateUrl: './crisis-resources.component.html',
  styleUrl: './crisis-resources.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrisisResourcesComponent {
  protected readonly resources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      contact: 'Call or Text 988',
      description: '24/7, free and confidential support for people in distress',
      url: 'https://988lifeline.org/',
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      description: 'Free, 24/7 support via text message',
      url: 'https://www.crisistextline.org/',
    },
    {
      name: 'SAMHSA National Helpline',
      contact: '1-800-662-4357',
      description: 'Treatment referral and information service (24/7)',
      url: 'https://www.samhsa.gov/find-help/national-helpline',
    },
    {
      name: 'Veterans Crisis Line',
      contact: 'Call 988 then Press 1',
      description: 'Support for Veterans and their families',
      url: 'https://www.veteranscrisisline.net/',
    },
  ];
}
