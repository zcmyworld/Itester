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

  onInitwebsocket() {
    if (!this.state.cpu_temp) {
      this.state.cpu_temp = [];
    }
    if (!this.state.cpu_utilization) {
      this.state.cpu_utilization = [];
    }
    if (!this.state.load_avg) {
      this.state.load_avg = [];
    }
    if (!this.state.current_ram) {
      this.state.current_ram = [];
    }

    setTimeout(() => {
      setInterval(() => {
        WsService.send(JSON.stringify({ key: 1 }));
      }, 1000)
    }, 1000)


    WsService.setMessageListener((rs) => {
      rs = JSON.parse(rs);

      if (rs.code == -1) {
        return
      }
      if (rs.connect_type == 'cpu_temp') {
        let item = {
          name: rs.data.time.formattime,
          temp: rs.data.info
        }
        this.state.cpu_temp = this.state.cpu_temp.concat([item]);
        this.state.cpu_temp = this.state.cpu_temp.slice(-20)
        this.setState({
          cpu_temp: this.state.cpu_temp
        })
      }
      if (rs.connect_type == 'cpu_utilization') {
        let item = {
          name: rs.data.time.formattime,
          cpu_utilization: rs.data.info
        }
        this.state.cpu_utilization = this.state.cpu_utilization.concat([item]);
        this.state.cpu_utilization = this.state.cpu_utilization.slice(-20)
        this.setState({
          cpu_utilization: this.state.cpu_utilization
        })
      }

      if (rs.connect_type == 'load_avg') {
        let item = {
          name: rs.data.time.formattime,
        }
        rs.data.info = rs.data.info.replace(/\\/g, '');
        rs.data.info = JSON.parse(rs.data.info);
        item['1_min_avg'] = rs.data.info['1_min_avg']
        item['5_min_avg'] = rs.data.info['5_min_avg']
        item['15_min_avg'] = rs.data.info['15_min_avg']
        this.state.load_avg = this.state.load_avg.concat([item]);
        this.state.load_avg = this.state.load_avg.slice(-20)
        this.setState({
          load_avg: this.state.load_avg
        })
      }
      if (rs.connect_type == 'current_ram') {
        let item = {
          name: rs.data.time.formattime,
          current_ram: rs.data.info
        }
        this.state.current_ram = this.state.current_ram.concat([item]);
        this.state.current_ram = this.state.current_ram.slice(-20)
        this.setState({
          current_ram: this.state.current_ram
        })
      }


    })
  }

  onSetKeyValue(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj)
  }
}