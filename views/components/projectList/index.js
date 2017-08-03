import {Row, Col, Card, Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { HashRouter, Route, Link } from 'react-router-dom';
let { Header, Content, Footer } = Layout;

import Action from './action';
import Store from './store';

export default class Index extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {
    Action.list();
  }

  render() {
    return (
      <div>
        <Breadcrumb
          style={{ margin: '12px 24px' }}
          routes={[{ breadcrumbName: 'Home', name: 'home', path: '/projects' }]}/>
        <Row style={{ background: '#fff', padding: 24, minHeight: 1080, paddingBottom: 100 }}>
          <Row gutter={16}>
            {
              this.state.projects && this.state.projects.map((item, idx) => {
                return (
                  <Col span={4} key={idx}>
                    <Link to='/projects/1'>
                      <Card >
                        <h1>{item.name}</h1>
                        <p>更新时间</p>
                        <p>{item.updated}</p>
                      </Card>
                    </Link>
                  </Col>
                )
              })
            }
          </Row>
        </Row>
      </div>
    );
  };
}
