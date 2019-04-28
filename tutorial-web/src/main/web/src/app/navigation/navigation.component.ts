import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public translate: TranslateService) {
    translate.addLangs(['fr', 'en']);

		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  public switchLanguage(lang: string) {
		console.log('UPDATE');
		this.translate.use(lang);
	}

}
