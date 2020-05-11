import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LaravelService} from '../_services/laravel.service';

@Component({
  selector: 'app-stepper-overview-example',
  templateUrl: './stepper-overview-example.component.html',
  styleUrls: ['./stepper-overview-example.component.css']
})
export class StepperOverviewExampleComponent implements OnInit {
  debug = false;
  question;
  errorMessage: any;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  totalPoints;
  totalCorrectAnswers;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder,
              private laravelService: LaravelService) {
  }

  get f1() {
    return this.firstFormGroup.controls;
  }

  get f2() {
    return this.secondFormGroup.controls;
  }

  get f3() {
    return this.thirdFormGroup.controls;
  }

  get f4() {
    return this.fourthFormGroup.controls;
  }

  getQuestion() {
    this.laravelService
      .getQuestions()
      .subscribe(
        data => [this.createQuestions(data)],
        error => this.errorMessage = error
      );
  }

  createQuestions(data) {
    this.question = [];
    // tslint:disable-next-line:forin
    for (const key in data.data) {
      this.question.push(data.data[key]);
      this.setFormValues(data.data[key], +key + 1);
    }
  }

  setFormValues(values, key) {
    const formGroupName = 'f' + key;
    this[formGroupName].question.setValue(values.name);
    this[formGroupName].correctAnswer.setValue(values.answers);
    this[formGroupName].points.setValue(values.points);
  }

  checkAnswer(key) {
    const formControlName = 'f' + key;
    const formGroups = [
      {id: 1, name: 'firstFormGroup'},
      {id: 2, name: 'secondFormGroup'},
      {id: 3, name: 'thirdFormGroup'},
      {id: 4, name: 'fourthFormGroup'}
    ];
    const formGroupName = formGroups[key - 1].name;

    if (this[formControlName].answer.invalid) {
      this[formGroupName].markAllAsTouched();
    }
    if (this[formControlName].answer.value === this[formControlName].correctAnswer.value) {
      this.totalPoints = this[formControlName].points.value;
      this.totalCorrectAnswers += 1;
    }
  }

  ngOnInit() {
    this.totalPoints = 0;
    this.totalCorrectAnswers = 0;
    this.firstFormGroup = this._formBuilder.group({
      question: ['', Validators.required],
      correctAnswer: [''],
      answer: ['', Validators.required],
      answerOptions: [[
        {value: 'A', viewValue: 'A microscopic, single-celled organism'},
        {value: 'B', viewValue: 'A sub-microscopic infectious agent that replicates only inside the living cells of an organism'},
        {value: 'C', viewValue: 'A multicellular organism with chlorophyll as its primary photosynthetic pigment'}
      ]],
      points: [''],

    });

    this.secondFormGroup = this._formBuilder.group({
      question: ['', Validators.required],
      correctAnswer: [''],
      answer: ['', Validators.required],
      answerOptions: [[
        {value: 'A', viewValue: 'Sars-CoV-2'},
        {value: 'B', viewValue: 'Covid-19'},
        {value: 'C', viewValue: 'Wuhan flu'}
      ]],
      points: [''],

    });
    this.thirdFormGroup = this._formBuilder.group({
      question: ['', Validators.required],
      correctAnswer: [''],
      answer: ['', Validators.required],
      answerOptions: [[
        {value: 'A', viewValue: 'It refers to the 19 molecules that make up the virus'},
        {value: 'B', viewValue: 'It is the 19th coronavirus identified since the WHO began naming them'},
        {value: 'C', viewValue: 'It is the year the virus was first encountered: 2019'}
      ]],
      points: [''],

    });
    this.fourthFormGroup = this._formBuilder.group({
      question: ['', Validators.required],
      correctAnswer: [''],
      answer: ['', Validators.required],
      answerOptions: [[
        {value: 'A', viewValue: 'Fever'},
        {value: 'B', viewValue: 'Dry cough'},
        {value: 'C', viewValue: 'Blurred vision'}
      ]],
      points: [''],

    });
    this.getQuestion();
  }
}
