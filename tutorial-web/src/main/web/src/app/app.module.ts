import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxLanguageSelectorModule } from 'ngx-language-selector';

import { AppComponent } from './app.component';
import { Graph } from './graph/graph.component';
import { Control } from './controller/control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WsControlComponent } from './ws-control/ws-control.component';
import { WsZprimeLineComponent } from './ws-zprime-line/ws-zprime-line.component';
import { WsZprimePointComponent } from './ws-zprime-point/ws-zprime-point.component';
import { WsZprimeStatComponent } from './ws-zprime-stat/ws-zprime-stat.component';

const appRoutes: Routes = [
  { path: 'welcome', component: FormComponent },
  { path: 'graph-2', component: Graph },
  { path: 'statistic', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent, Graph, Control, NavigationComponent, DashboardComponent, FormComponent, WsControlComponent, WsZprimeLineComponent, WsZprimePointComponent, WsZprimeStatComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgxLanguageSelectorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    MatBadgeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
