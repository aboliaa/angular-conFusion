import { Component, OnInit, Input, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @Input()
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  dishcopy = null;
  
  constructor(private dishService: DishService,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		@Inject('BaseURL') private BaseURL) {
	this.createForm();
  }

  ngOnInit() {
	let id = +this.route.snapshot.params['id'];
	this.dishService.getDish(id)
		.subscribe(dish => this.dish = dish,
		errmess => this.errMess = <any>errmess);
		
	this.dishService.getDishIds()
		.subscribe(dishIds => this.dishIds = dishIds,
		errmess => this.errMess = <any>errmess);
	
	this.route.params
      .switchMap((params: Params) => { return this.dishService.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
		errmess => { this.dish = null; this.errMess = <any>errmess; }); 
  }

  goBack(): void {
	this.location.back();
  }
  
  setPrevNext(dishId: number) {
	let index = this.dishIds.indexOf(dishId);
	this.prev = this.dishIds[(this.dishIds.length+index-1) % this.dishIds.length];
	this.next = this.dishIds[(this.dishIds.length+index+1) % this.dishIds.length];
  }
  
  createForm() {
	  this.commentForm = this.fb.group({
		author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
		rating: [5],
		comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
	  });
	  
	  this.commentForm.valueChanges
		.subscribe(data => this.onValueChanged(data),
		errmess => this.errMess = <any>errmess);
	  this.onValueChanged();
  }
  
  onSubmit() {
	this.comment = this.commentForm.value;
	console.log(this.comment);
	
	var d = new Date();
	this.comment["date"] = d.toISOString();
	
	this.commentForm.reset({
		author: '',
		rating: 5,
		comment: ''
	});
	
	this.dishcopy.comments.push(this.comment);
	this.dishcopy.save()
		.subscribe(dish => {this.dish = dish; console.log(this.dish);});
  }
  
  formErrors = {
	author: '',
	rating: 5,
	comment: ''
  }
  
  validationMessages = {
	'author': {
      'required':      'Your name is required.',
      'minlength':     'Your name must be at least 2 characters long.',
      'maxlength':     'Your name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 100 characters long.'
    }
  };

  onValueChanged(data?: any) {
	if (!this.commentForm) {
		return;
	}
	
	const form = this.commentForm;
	for (const field in this.formErrors) {
		this.formErrors[field] = '';
		const control = form.get(field);
		if (control && control.dirty && !control.valid) {
			const messages = this.validationMessages[field];
			for (const key in control.errors) {
				this.formErrors[field] += messages[key] + '';
			}
		}
	}
  }
}
