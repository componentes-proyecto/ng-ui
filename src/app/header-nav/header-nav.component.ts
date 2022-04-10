import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UIDataService } from '../services/ui-data.service';

import { HeaderNavModel } from '../models/header-nav.model';
import { PageDataModel } from '../models/pageDataModel.model';

@Component({
  selector: 'ng-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  public headerNavItems: HeaderNavModel[] = [];
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public titleText: string = '';

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly uiDataService: UIDataService
    ) { }

  ngOnInit(): void {
    this.uiDataService.pageDataState.subscribe((pageData: PageDataModel) => {
      this.headerNavItems = pageData.headerNavItems;
      this.titleText = pageData.titleText
    });
  }
  
}
