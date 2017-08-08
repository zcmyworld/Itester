import Reflux from 'reflux';
import Action from './action';

import Service from '../../services/Project';
import WsService from '../../services/Ws';

import TimeTool from '../../utils/time';



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

  onInitwebsocket(list) {
    if (!list) {
      this.setState({
        cpu_temp: []
      })
    }
    setTimeout(() => {
      setInterval(() => {
        WsService.send(JSON.stringify({ key: 1 }));
      }, 1000)
    }, 2000)


    WsService.setMessageListener((rs) => {
      rs = JSON.parse(rs);
      let item = {
        name: rs.data.time.formattime,
        temp: rs.data.temp
      }
      this.state.cpu_temp = this.state.cpu_temp.concat([item]);
      this.state.cpu_temp = this.state.cpu_temp.slice(-20)
      this.setState({
        cpu_temp: this.state.cpu_temp
      })
    })
  }

  onSetKeyValue(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj)
  }
}