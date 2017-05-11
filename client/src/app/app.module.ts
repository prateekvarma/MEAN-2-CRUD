import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateService } from './services/candidate.service';

@NgModule({
  declarations: [
    AppComponent,
    CandidateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
   CandidateService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
