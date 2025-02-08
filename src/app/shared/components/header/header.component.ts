import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input({ required: true }) name: string = '';

  date = new Date();
  showHello: boolean = false;

  private routeSubscription!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowHello();
      });

    this.updateShowHello();
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private updateShowHello() {
    const currentRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
    const showHelloRoutes = ['transactions'];
    this.showHello = currentRoute ? showHelloRoutes.includes(currentRoute) : false;
  }

}
