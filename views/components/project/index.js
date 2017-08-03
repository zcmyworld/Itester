import React from 'react';
import Reflux from 'reflux';

import { HashRouter, Route, Link } from 'react-router-dom';

import { Row, Col, Card, Layout, Menu, Breadcrumb, Table, Button, Input, Select, Checkbox, Popconfirm} from 'antd';
const { Header, Content, Footer } = Layout;

const SubMenu = Menu.SubMenu;
import Action from './action';
import Store from './store';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 9000 },
  { name: 'Page B', uv: 3000, pv: 7222 },
  { name: 'Page C', uv: 2000, pv: 6222 },
  { name: 'Page D', uv: 1223, pv: 5400 },
  { name: 'Page E', uv: 1890, pv: 3200 },
  { name: 'Page F', uv: 2390, pv: 2500 },
  { name: 'Page G', uv: 3490, pv: 1209 },
  { name: 'Page G', uv: 3490, pv: 1209 },
  { name: 'Page G', uv: 3490, pv: 1209 },
];
const SimpleAreaChart = React.createClass({
  render() {
    return (
      <div>
        <h4>A demo of synchronized AreaCharts</h4>
        <LineChart width={600} height={200} data={data} syncId="anyId"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Line type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
        </LineChart>
        <p>Maybe some other content</p>
        <LineChart width={600} height={200} data={data} syncId="anyId"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Line type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
          <Brush />
        </LineChart>
        <AreaChart width={600} height={200} data={data} syncId="anyId"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
        </AreaChart>
      </div>
    );
  }
})


export default class Index extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {
    Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }]);
    setTimeout(() => {
      Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }]);
    }, 1000)
    setTimeout(() => {
      Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }]);
    }, 2000)
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }]);
    // Action.menu([{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }]);
  }

  render() {
    return (
      <div>
        <h2>Test Url</h2>
        <Input placeholder="url"/>
        <h2>Loadtest Config</h2>
        <Input placeholder="请求数"/>
        <Input placeholder="并发量"/>
        <Input placeholder="频率"/>
        <Button>启动</Button>
        <h2>System Dashboard</h2>
        {
          this.state.CPU ?
            <LineChart width={600} height={300} data={this.state.CPU}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }}/>
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart> : ''
        }
        <div>
          <h4>A demo of synchronized AreaCharts</h4>
          {
            this.state.CPU ?
              <LineChart width={600} height={200} data={this.state.CPU} syncId="anyId"
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Line type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
              </LineChart> : ''
          }
          <p>Maybe some other content</p>
          
          <LineChart width={600} height={200} data={this.state.CPU} syncId="anyId"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Line type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
            <Brush />
          </LineChart>
          {
            this.state.CPU ?
              <AreaChart width={600} height={200} data={this.state.CPU} syncId="anyId"
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
              </AreaChart> : ""
          }
        </div>
      </div>
    );
  };
}
