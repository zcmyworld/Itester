import React from 'react';
import Reflux from 'reflux';

import { HashRouter, Route, Link } from 'react-router-dom';

import { Row, Col, Card, Layout, Menu, Breadcrumb, Table, Button, Input, Select, Checkbox, Popconfirm } from 'antd';
const { Header, Content, Footer } = Layout;

const SubMenu = Menu.SubMenu;
import Action from './action';
import Store from './store';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, AreaChart, Area, BarChart, Bar } from 'recharts';


function mathRand(randLen = 6) {
  let Num = "";
  for (var i = 0; i < randLen; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return parseInt(Num);
}

export default class Index extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {
    let data = [
      { name: 'a', pv: 8000 },
      { name: 'b', pv: 7222 },
      { name: 'c', pv: 6222 },
      { name: 'd', pv: 5400 },
      { name: 'e', pv: 3200 },
      { name: 'f', pv: 2500 },
      { name: 'g', pv: 1209 },
      { name: 'h', pv: 1209 },
      { name: 'i', pv: 1209 },
      { name: 'i1', pv: 1209 },
      { name: 'i3', pv: 1209 },
      { name: 'i4', pv: 1209 },
      { name: 'i7', pv: 1209 },
      { name: 'i8', pv: 1209 },
      { name: 'i9', pv: 1209 },
      { name: 'j', pv: 1209 },
      { name: 'j1', pv: 1209 },
      { name: 'j2', pv: 1209 },
      { name: 'j3', pv: 1209 },
      { name: 'j4', pv: 1209 },
      { name: 'j5', pv: 1209 },
      { name: 'j6', pv: 1209 },
      { name: 'k1', pv: 1209 },
      { name: 'k1', pv: 1209 },
      { name: 'k2', pv: 1209 },
      { name: 'k3', pv: 1209 },
      { name: 'k4', pv: 1209 },
      { name: 'k5', pv: 1209 },
      { name: 'k6', pv: 1209 },
      { name: 'k7', pv: 1209 },
      { name: 'k8', pv: 1209 },
      { name: 'k9', pv: 1209 },
      { name: 'l1', pv: 1209 },
      { name: 'l2', pv: 1209 },
      { name: 'l3', pv: 1209 },
      { name: 'm', pv: 1209 },
      { name: 'm1', pv: 1209 },
      { name: 'm2', pv: 1209 },
      { name: 'm3', pv: 1209 },
      { name: 'm4', pv: 1209 },
      { name: 'm5', pv: 1209 },
      { name: 'm6', pv: 1209 },
    ];
    let time = {
      hour: 17,
      min: 45,
      second: 0
    }
    //30s实时
    data = [];
    function time2str(time) {
      return time.hour.toString() + ":" + time.min.toString() + ":" + time.second.toString();
    }
    for (let i = 0; i < 50; i++) {
      if (time.second != 0) {
        time.second = 0
      }
      else if (time.second == 0 && time.min != 0) {
        time.min = time.min - 1;
        time.second = 30;
      }
      // data.push({ name: time, pv: 0 })
      data = [{ name: time2str(time), pv: 0 }].concat(data);
    }
    // console.log(data)



    // Action.menu(data);

    // setInterval(() => {
    Action.menu(this.state.CPU);
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }]);
    // }, 1000)
    // setTimeout(() => {
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }]);
    // }, 2000)
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }]);
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }]);
  }

  render() {
    console.log("render");
    // console.log(typeof this.state.CPU)
    console.log(this.state.CPU)

    return (
      <div>
        <h2>Test Url</h2>
        <Input placeholder="url" />
        <h2>Loadtest Config</h2>
        <Input placeholder="请求数" />
        <Input placeholder="并发量" />
        <Input placeholder="频率" />
        <Button>启动</Button>
        <h2>System Dashboard</h2>
        {
          this.state.CPU ?
            <AreaChart width={600} height={400} data={this.state.CPU}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Area type='monotone' dataKey='temp' stroke='#8884d8' fill='#8884d8' activeDot={{ r: 8 }}/>
            </AreaChart> : ''
        }
      </div>
    );
  };
}
