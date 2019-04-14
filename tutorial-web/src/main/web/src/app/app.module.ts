import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { Graph } from './graph/graph.component';
import { Control } from './controller/control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'graph-1', component: FormComponent },
  { path: 'graph-2', component: Graph },
  { path: 'console', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent, Graph, Control, NavigationComponent, DashboardComponent, FormComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
