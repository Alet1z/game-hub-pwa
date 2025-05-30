import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authSrv = inject(AuthService)
  private router = inject(Router)
  title = 'ecommerce-GO100123';
  isLoggedIn = this.authSrv.isLoggedIn;

  logOut(){
    this.authSrv.logout()
    this.router.navigate(['/'])
  }
    
}
