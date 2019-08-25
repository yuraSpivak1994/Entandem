import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation =
  trigger('simpleFadeAnimation', [
    state('in', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate(600 )
    ]),
    transition(':leave',
      animate(600, style({opacity: 0})))
  ]);

export const slideAnimation = trigger('slideAnimation', [
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    style({ transform: 'translateX(-100%)' }),
    animate(100)
  ]),
  transition('* => void', [
    animate(100, style({ transform: 'translateX(-100%)' }))
  ])
]);

