import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import { CSSTransitionGroup } from 'react-transition-group';

import { Row, Col, Card, Layout, Menu, Breadcrumb, Icon, Table, Collapse } from 'antd';
let { Header, Content, Footer } = Layout;

const SubMenu = Menu.SubMenu;
import ProjectList from './projectList/index.js';


import Project from './project/index.js';



const reqHeaderColumns = [
  {
    title: 'headerKey',
    dataIndex: 'headerKey',
    key: 'headerKey'
  }, {
    title: 'headerValue',
    dataIndex: 'headerValue',
    key: 'headerValue',
  }
];

const reqHeaderDataSource = [
  {
    key: '1',
    headerKey: 'userName',
    headerValue: 'userName',
  }, {
    key: '2',
    headerKey: 'userName',
    headerValue: 'userName',

  }
];

const columns = [
  {
    title: '参数',
    dataIndex: 'argument',
    key: 'argument'
  }, {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '默认值',
    dataIndex: 'defaultValue',
    key: 'defaultValue',
  }
];

const dataSource = [
  {
    key: '1',
    argument: 'userName',
    description: '用户名',
    type: 'string',
    defaultValue: '-'
  }, {
    key: '2',
    argument: 'password',
    description: '密码',
    type: 'string',
    defaultValue: '-'
  }
];


ReactDom.render((
  <Layout className="layout">
    <Header id="header" style={{ 'background': '#fff', 'borderBottom': '1px solid #e9e9e9', 'fontSize': '16px', 'padding': '0 74px' }}>
      <div className="amr-row">
        <Row>
          <Col span={3}>Itester</Col>
          <Col span={21}>
            <div style={{ 'float': 'left', 'width': '200px', 'height': '64px' }}>
              <div style={{ 'height': '30px', 'lineHeight': '30px', 'marginTop': '18px', 'borderLeft': '1px solid #e9e9e9' }}>

              </div>
            </div>
            <div style={{ 'float': 'right' }}>
              <Menu
                mode="horizontal"
                style={{ lineHeight: '62px', 'borderBottom': 'none' }}
                >
                <Menu.Item key="project">项目</Menu.Item>
                <Menu.Item key="user">用户</Menu.Item>
                <Menu.Item key="system">系统</Menu.Item>
              </Menu>
            </div>
          </Col>
        </Row>
      </div>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <HashRouter>
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          >
          <Route exact path="/projects" component={ProjectList} key={1}></Route>
          <Route exact path="/projects/:projectId" component={Project} key={2}></Route>
        </CSSTransitionGroup>
      </HashRouter>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
    </Footer>
  </Layout>
), document.querySelector('#view'));
