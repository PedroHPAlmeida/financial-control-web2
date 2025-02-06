import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  date = new Date();

  @Input() showHello: boolean = false;
  @Input({ required: true }) name: string = '';
}
