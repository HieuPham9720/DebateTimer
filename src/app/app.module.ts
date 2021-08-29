import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { FormatChoiceComponent } from './format-choice/format-choice.component';
import { TimerComponent } from './timer/timer.component';
import { InvalidComponent } from './invalid/invalid.component';
import { SpeechOrderComponent } from './timer/speech-order/speech-order.component';

const appRoutes: Routes = [
  { path: '', component: FormatChoiceComponent},
  { 
    path: 'timer', 
    children: [
      { path: ':id', component: TimerComponent }
    ]
  },
  { path: '**', component:  InvalidComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormatChoiceComponent,
    TimerComponent,
    InvalidComponent,
    SpeechOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
