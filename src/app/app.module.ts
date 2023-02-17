import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutinModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './modules/angular-material.module';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    AppRoutinModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
