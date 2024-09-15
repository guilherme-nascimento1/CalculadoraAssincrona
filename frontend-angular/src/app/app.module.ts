import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
})
export class AppModule { }
