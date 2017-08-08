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
    Action.initwebsocket(this.state.cpu_temp);
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
          this.state.cpu_temp ?
            <AreaChart width={600} height={400} data={this.state.cpu_temp}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Area type='monotone' dataKey='temp' stroke='#8884d8' fill='#8884d8' activeDot={{ r: 8 }}/>
            </AreaChart> : ''
        }
      </div>
    );
  };
}
