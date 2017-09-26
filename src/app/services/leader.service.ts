import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeader(id: number): Leader {
	return LEADERS.filter((leader) => (leader.id === id))[0];
  }
  
  getFeaturedLeader(): Leader {
	return LEADERS.filter((dish) => dish.featured)[0];
  }
  
  getLeaders(): Leader[] {
	return LEADERS;
  }
}
