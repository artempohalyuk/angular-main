import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INews } from '../../models';
import { SidebarNewsItemComponent } from './sidebar-news-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-news',
  templateUrl: './sidebar-news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SidebarNewsItemComponent, CommonModule]
})
export class SidebarNewsComponent implements OnInit {
  @Input() newsList: INews[] | null = [];

  constructor() { }

  ngOnInit() {
  }

}
