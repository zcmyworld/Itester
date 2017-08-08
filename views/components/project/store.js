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

  onMenu(list) {
    if (!list) {
      // list = [];
      this.setState({
        CPU: []
      })
    }
    setTimeout(() => {
      setInterval(() => {
        WsService.send(JSON.stringify({key: 1}));

      }, 1000)
    }, 2000)



    WsService.setMessageListener((rs) => {
      rs = JSON.parse(rs);
      console.log(rs)
      let item = {
        name: rs.data.time.formattime,
        temp: rs.data.temp
      }
      this.state.CPU = this.state.CPU.concat([item]);
      this.state.CPU = this.state.CPU.slice(-20)
      this.setState({
        CPU: this.state.CPU
      })
    })


    // this.setState({
    //   CPU: [{ name: '11:33:42', temp: 23 }]
    // } )
    // setTimeout(() => {
    //   this.setState({
    //     CPU: [{ name: '11:33:42', temp: 12 }, { name: '11:33:43', temp: 23 }]
    //   })
    // }, 1000);
    // setTimeout(() => {
    //   this.setState({
    //     CPU: [{ name: '11:33:42', temp: 12 }, { name: '11:33:43', temp: 23 }, { name: '11:33:44', temp: 73 }]
    //   })
    // }, 2000);
  }

  onSetKeyValue(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj)
  }
}