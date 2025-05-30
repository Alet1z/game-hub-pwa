import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authSrv = inject(AuthService);
  isLoggedIn = this.authSrv.isLoggedIn



  scrollPercent = 0;
  scrollY = signal(0);

  ngOnInit(): void {
    this.updateScrollProgress(); // Inicial
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateScrollProgress();
    this.scrollY.set(window.scrollY);
  }

  private updateScrollProgress(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollPercent = docHeight ? (scrollTop / docHeight) * 100 : 0;
  }
}