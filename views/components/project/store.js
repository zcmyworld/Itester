import Reflux from 'reflux';
import Action from './action';

import Service from '../../services/Project';
import WsService from '../../services/Ws';

import TimeTool from '../../utils/time';

function mathRand(randLen = 6) {
  let Num = "";
  for (var i = 0; i < randLen; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return parseInt(Num);
}

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
    WsService.setMessageListener(function(rs) {
      console.log('success')
      console.log(rs)
    });
    if (!list) {
      list = [];
    }
    for (let i = 0; i < 3; i++) {
      console.log(i)
      Service.cpu_temp().then((temp) => {
        console.log(temp)

      })
    }

    this.setState({
      CPU: [{ name: 'a', temp: 8000 }]
    })
    setTimeout(() => {
      this.setState({
        CPU: [{ name: 'a', temp: 8000 }, { name: 'b', temp: 8920 }]
      })
    }, 1000);
    setTimeout(() => {
      this.setState({
        CPU: [{ name: 'a', temp: 8000 }, { name: 'b', temp: 8920 }, { name: 'c', temp: 7120 }]
      })
    }, 2000);
  }

  onSetKeyValue(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj)
  }
}