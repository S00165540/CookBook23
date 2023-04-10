import { Component, OnInit, AfterViewInit, Input  } from '@angular/core';
import { Banner } from 'src/app/recipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements AfterViewInit{
  @Input() banner!: Banner;
  
      constructor() {    }
  
      ngAfterViewInit() {
          setTimeout(() => {
              try {
                  (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
                      overlays: {bottom: true}
                  });
              } catch (e) {
                  console.error(e);
              }
          }, 0);
      }
  
  
}


