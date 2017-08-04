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
    ];

    Action.menu(data);


    setInterval(() => {
      for (let i in data) {
        data[i].pv = mathRand(4);
      }
      console.log(data)
      Action.menu(data);
      // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }]);
    }, 1000)
    // setTimeout(() => {
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }]);
    // }, 2000)
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }]);
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }]);
  }

  render() {
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
              <Area type='monotone' dataKey='pv' stroke='#8884d8' fill='#8884d8' />
            </AreaChart> : ''
        }
        {
          this.state.CPU ?
            <LineChart width={600} height={300} data={this.state.CPU}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart> : ''
        }
        {this.state.CPU && this.state.CPU[0].pv}
        {
          this.state.CPU ?
            <BarChart width={600} height={300} data={this.state.CPU}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="pv" fill="#8884d8" activeDot={{ r: 8 }} />
            </BarChart> : ''
        }
      </div>
    );
  };
}
