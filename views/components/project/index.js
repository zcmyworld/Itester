import React from 'react';
import Reflux from 'reflux';

import { HashRouter, Route, Link } from 'react-router-dom';

import { Row, Col, Card, Layout, Menu, Breadcrumb, Table, Button, Input, Select, Checkbox, Popconfirm} from 'antd';
const { Header, Content, Footer } = Layout;

const SubMenu = Menu.SubMenu;
import Action from './action';
import Store from './store';

import RequestHeaders from './RequestHeaders';
import RequestBody from './RequestBody';
import Response from './Response';
import ProjectMenu from './ProjectMenu';

export default class Index extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {
    Action.info(1);
    Action.menu(1);
  }

  render() {
    if (!this.state.project || !this.state.menu) {
      return null;
    }

    return (
      <div>
        <Breadcrumb
          style={{ margin: '12px 24px' }}
          routes={[{ breadcrumbName: 'Home', name: 'home', path: '/projects' }, { breadcrumbName: '项目名称', path: '/123' }]}/>
        <Row style={{ background: '#fff', padding: 24, minHeight: 1080, paddingBottom: 100 }}>
          <Col span={3}>
            <ProjectMenu />
          </Col>
          <Col span={21}>
            <div style={{ 'marginLeft': '30px' }}>
              <Row>
                <Col style={{ 'float': 'left' }}>
                  {
                    this.state.EDIT_MODE ?
                      <div>
                        <Input defaultValue={this.state.project.title}/>
                      </div>
                      :
                      <h1>{this.state.project.title}</h1>
                  }

                </Col>
                <Col style={{ 'float': 'right' }}><Button type="primary" size="large">mock</Button></Col>
              </Row>
              <Row>
                {
                  this.state.EDIT_MODE ?
                    <div>
                      <Input type='textarea' defaultValue={this.state.project.des}/>
                    </div>
                    :
                    <div>
                      {this.state.project.des}
                    </div>
                }
              </Row>
              <Row  className='api-title'>
                <h2>
                  <span>调用地址: </span>
                  {
                    this.state.EDIT_MODE ?
                      <div>
                        <Input defaultValue={this.state.project.route}/>
                      </div>
                      :
                      <span>
                        {this.state.project.route}
                      </span>
                  }
                </h2>
              </Row>
              <Row className='api-title'>
                <h2>
                  <span>调用方式: </span>
                  {
                    this.state.EDIT_MODE ?
                      <Select defaultValue={this.state.project.method} style={{ width: 120 }}>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                        <Option value="PUT">PUT</Option>
                        <Option value="DELETE">DELETE</Option>
                        <Option value="PATCH">PATCH</Option>
                      </Select>
                      :
                      <span>
                        {this.state.project.method}
                      </span>
                  }
                </h2>
              </Row>
              <RequestHeaders/>
              <RequestBody/>
              <Response/>
            </div>
          </Col>
        </Row>
      </div>
    );
  };
}
