import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'client';
  items: MenuItem[] = [
    {
      label: 'Лексика',
      icon: 'pi pi-fw pi-book',
    },
    {
      label: 'Вибірки лексики',
      icon: 'pi pi-fw pi-filter',
    },
    {
      label: 'Статистика',
      icon: 'pi pi-fw pi-chart-pie',

    },
  ];
}
