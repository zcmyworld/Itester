import Reflux from 'reflux';
import Action from './action';

import Service from '../../services/Project';

export default class Store extends Reflux.Store {
  constructor() {
    super();
    this.listenables = Action;
  }

  onList() {
    Service.list().then((projects) => {
      this.setState({
        projects:projects
      })
    })
  }
}