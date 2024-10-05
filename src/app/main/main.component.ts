import { Component } from '@angular/core';
import { StudentlicenseComponent } from "../studentlicense/studentlicense.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [StudentlicenseComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
