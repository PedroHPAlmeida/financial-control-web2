import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  image: string;
  isSelected: boolean;
  routerLink: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    { title: 'Home', image: 'assets/icons/overview.svg', isSelected: true, routerLink: '/' },
    { title: 'Extrato', image: 'assets/icons/transaction.svg', isSelected: false, routerLink: '/transactions' },
    { title: 'Consolidado', image: 'assets/icons/wallet.svg', isSelected: false,  routerLink: '/consolidated' },
    // { title: 'Bills', image: 'assets/icons/bill.svg', isSelected: false },
    // { title: 'Expenses', image: 'assets/icons/expenses.svg', isSelected: false },
    // { title: 'Goals', image: 'assets/icons/goal.svg', isSelected: false },
    // { title: 'Settings', image: 'assets/icons/settings.svg', isSelected: false },
  ];

  onClickMenuItem(item: MenuItem) {
    this.menuItems.forEach((menuItem) => menuItem.isSelected = menuItem === item);
  }
}
