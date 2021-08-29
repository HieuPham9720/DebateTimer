import { Component, OnInit } from '@angular/core';
import { Format, TimerService } from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  format: Format;         // the format to time
  isPrepTime: boolean;    // for div that display preptime
  displayTime: number;    // for time that is shown on screen, in millisecond
  displayMinute: string;  // for time that is shown on screen
  displaySecond: string;  // for time that is shown on screen
  currentSpeech: string;  // the speech that appears on screen
  speechIndex: number;    // traverse the format for trackedTime
  trackedTime: number;    // 

  interval: ReturnType<typeof setTimeout>;  // timer tick

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.format = this.timerService.currentFormat;
    this.isPrepTime = true;
    this.displayMinute = '00';
    this.displaySecond = '00';
    this.displayTime = 0;
    this.speechIndex = 0; 
  }

  startTimer() {
    if (this.isPrepTime) {
      this.trackedTime = this.format.prepTime;
    }
    else {
      this.trackedTime = this.format.speechesTime[this.speechIndex];
    }
    // to avoid multiple interval running
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(this.operateTimer.bind(this, this.trackedTime), 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.displayTime = 0;
    this.displayMinute = '00';
    this.displaySecond = '00';
  }

  resumeTimer() {
    this.interval = setInterval(this.operateTimer.bind(this, this.trackedTime), 1000);
  }

  // move on
  skipTimer() {
    if (!this.isPrepTime) {
      this.speechIndex++;
      if (this.speechIndex >= this.format.speeches.length) {
        this.timeOver();
      } 
    }
    this.isPrepTime = false;
    this.currentSpeech = this.format.speeches[this.speechIndex];
    this.trackedTime = this.format.speechesTime[this.speechIndex];
    this.restartTimer();
    this.pauseTimer();
  }

  restartTimer() {
    clearInterval(this.interval);
    this.displayTime = 0;
    this.interval = setInterval(this.operateTimer.bind(this, this.trackedTime), 1000);
  }

  operateTimer(currentTrackedTime: number) {
    this.displayTime += 1000;
    console.log(currentTrackedTime);
    // if current turn is over -> move on
    if (this.displayTime > currentTrackedTime) {
      alert("Time's up!");
      this.skipTimer();
    }
    this.displayMinute = Math.floor(this.displayTime / 60000).toString();
    if (this.displayMinute.length < 2) {
      this.displayMinute = '0' + this.displayMinute;
    }
    this.displaySecond = ((this.displayTime / 1000) % 60).toString();
    if (this.displaySecond.length < 2) {
      this.displaySecond = '0' + this.displaySecond;
    }
  }

  // when debate is over
  timeOver() {
    alert("Debate is over.");
  }

}
