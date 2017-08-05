import Reflux from 'reflux';
import Action from './action';

import Service from '../../services/Project';

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
    if (!list) {
      list = [];
    }
    this.setState({
      CPU: [{ name: 'a', pv: 8000 }]
    })
    setTimeout(() => {
      this.setState({
        CPU: [{ name: 'a', pv: 8000 }, { name: 'b', pv: 8920 }]
      })
    }, 1000);
    setTimeout(() => {
      this.setState({
        CPU: [{ name: 'a', pv: 8000 }, { name: 'b', pv: 8920 }, { name: 'c', pv: 7120 }]
      })
    }, 2000);
    // setInterval(() => {
    //   source.shift();
    //   this.setState({
    //     CPU: source
    //   })
    // }, 1000)

    return;
    let item = source.shift();
    list.push(item);
    this.setState({
      CPU: list
    })
    setTimeout(() => {
      let item = source.shift();
      list.push(item);
      this.setState({
        CPU: list
      })
    }, 1000)
    setTimeout(() => {
      let item = source.shift();
      list.push(item);
      this.setState({
        CPU: list
      })
    }, 2000)
    setTimeout(() => {
      let item = source.shift();
      list.push(item);
      this.setState({
        CPU: list
      })
    }, 3000)

    // console.log(this.state)
  }

  onSetKeyValue(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj)
  }
}