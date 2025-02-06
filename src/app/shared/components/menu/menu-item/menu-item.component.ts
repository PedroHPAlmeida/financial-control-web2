import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input({ required: true }) image: string = '';
  @Input({ required: true }) isSelected: boolean = false;
  @Input({ required: true }) routerLink: string = '';

  constructor(private router: Router) { }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();

    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
