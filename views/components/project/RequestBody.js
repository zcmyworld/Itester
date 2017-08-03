import React from 'react';
import Reflux from 'reflux';

import { Row, Col, Icon, Table, Checkbox, Popconfirm, Button, Input} from 'antd';

import Action from './action';
import Store from './store';

export default class RequestBody extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Row className='api-title'>
          <h2>
            Request Body
          </h2>
        </Row>
        <Row>
          <pre>
            {JSON.stringify(this.state.project.reqBody, null, 2) }
          </pre>
        </Row>
        <Row>
          {
            this.state.EDIT_MODE ?
              <Input type='textarea' autosize={true} defaultValue={JSON.stringify(this.state.project.reqBody, null, 2) }/>
              :
              <pre >
                { JSON.stringify(this.state.project.reqBody, null, 2) }
              </pre>
          }
        </Row>
      </div>
    );
  };
}
