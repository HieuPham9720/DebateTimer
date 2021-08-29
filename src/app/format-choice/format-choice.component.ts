import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-format-choice',
  templateUrl: './format-choice.component.html',
  styleUrls: ['./format-choice.component.css']
})
export class FormatChoiceComponent implements OnInit {

  defaultFormat = "AP";

  constructor(private router: Router,
              private timerService: TimerService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const chosenFormatName = form.value.format;
    const chosenFormat = this.timerService.availableFormats[chosenFormatName];
    this.timerService.setFormat(chosenFormat);
    this.router.navigate(['timer', chosenFormatName]);
  }

}
