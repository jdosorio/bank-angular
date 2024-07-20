import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  options: AnimationOptions = {
    path: '/assets/bank.json',
  };

  animationCreated(animationItem: AnimationItem): void {

  }

}
