import Reflux from 'reflux';
import Action from './action';

import Service from '../../services/Project';

export default class Store extends Reflux.Store {
  constructor() {
    super();
    this.listenables = Action;
  }

  onInfo(projectId) {
    Service.info(projectId).then((project) => {
      let reqHeadData = [];
      project.reqHead.map((item, idx) => {
        reqHeadData.push({
          key: idx,
          arg: item.arg,
          des: item.des
        })
      })

      this.setState({
        project: project,
        reqHeadData: reqHeadData,
        EDIT_MODE: true
      })
    })
  }

  onMenu(list) {
    this.setState({
      CPU: list
    })
    // console.log(this.state)
  }

  onSetKeyValue(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj)
  }
}