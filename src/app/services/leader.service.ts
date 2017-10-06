import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Leader } from '../shared/leader';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeader(id: number): Observable<Leader> {
	return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
	return this.restangular.all('leaders').getList({featured: true})
		.map(leaders => leaders[0]);
  }

  getLeaders(): Observable<Leader[]> {
	return this.restangular.all('leaders').getList();
  }

}
