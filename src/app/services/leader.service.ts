import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeader(id: number): Observable<Leader> {
	return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
  }
  
  getFeaturedLeader(): Observable<Leader> {
	return Observable.of(LEADERS.filter((dish) => dish.featured)[0]).delay(2000);
  }
  
  getLeaders(): Observable<Leader[]> {
	return Observable.of(LEADERS).delay(2000);
  }
}
