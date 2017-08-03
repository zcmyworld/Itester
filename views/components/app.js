import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import { CSSTransitionGroup } from 'react-transition-group';

import { Row, Col, Card, Layout, Menu, Breadcrumb, Icon, Table, Collapse } from 'antd';
let { Header, Content, Footer } = Layout;

const SubMenu = Menu.SubMenu;

import Project from './project/index.js';

ReactDom.render((
  <Layout className="layout">
    <Header id="header" style={{ 'background': '#fff', 'borderBottom': '1px solid #e9e9e9', 'fontSize': '16px', 'padding': '0 74px' }}>
      <div className="amr-row">
        <Row>
          <Col span={3}><h1>Itester</h1></Col>
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
              </Menu>
            </div>
          </Col>
        </Row>
      </div>
    </Header>
    <Content style={{ padding: '0 100px' }}>
      <HashRouter>
        <Route exact path="/projects" component={Project} key={1}></Route>
      </HashRouter>
    </Content>
  </Layout>
), document.querySelector('#view'));
