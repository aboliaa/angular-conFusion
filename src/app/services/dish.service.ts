import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor() { }

  getDish(id: number): 	Observable<Dish> {
	return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }
  
  getFeaturedDish(): Observable<Dish> {
	return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
  }
  
  getDishes(): Observable<Dish[]> {
	return Observable.of(DISHES).delay(2000);
  }
}
