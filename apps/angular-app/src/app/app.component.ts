import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { dateToIS08601WithTimeZoneOffset } from '@axhxrx/date';
import { Animal } from '@local/nx-buildable-esbuild-lib';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-app' + dateToIS08601WithTimeZoneOffset();  
  animal = new Animal('Bob', 10, 'human');
}
