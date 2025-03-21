import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = '30daysAngularChallenge';

  public isHomePage = true;

  public navLinks = [
    {
      name: 'Drum', path: '/drum'
    },
    {
      name: 'Rate', path: '/rate'
    }
  ]


  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/';
    });
  }
}
