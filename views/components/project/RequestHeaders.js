import React from 'react';
import Reflux from 'reflux';

import { Row, Col, Icon, Table, Button, Input, Select, Checkbox, Popconfirm} from 'antd';

import Action from './action';
import Store from './store';

export default class RequestHeaders extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {
  }

  drop(index) {
    let reqHeadData = this.state.reqHeadData;
    reqHeadData.splice(index, 1);
    Action.setKeyValue('reqHeadData', reqHeadData);
  }

  add() {
    let reqHeadData = this.state.reqHeadData;
    let newData = {
      key: reqHeadData.length,
      arg: '',
      des: '',
    };
    Action.setKeyValue('reqHeadData', reqHeadData.concat([newData]));
  }

  render() {
    let REQ_HEADER_COLUMN = [
      {
        title: '参数',
        dataIndex: 'arg',
        key: 'arg'
      }, {
        title: '说明',
        dataIndex: 'des',
        key: 'des',
      }, {
        title: '可选',
        dataIndex: 'optional',
        key: 'optional',
        render: text => <Checkbox />,
      }, {
        title: '默认值',
        dataIndex: 'defVal',
        key: 'defVal',
        render: text => '-',
      }
    ];

    if (this.state.EDIT_MODE) {
      REQ_HEADER_COLUMN.push({
        title: 'operation',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record, index) => {
          return (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.drop(index) }>
              <a href="#">Delete</a>
            </Popconfirm>
          )
        }
      });
    }
    return (
      <div>
        <Row className='api-title'>
          <h2>Request Headers</h2>
        </Row>
        <Row>
          {
            this.state.EDIT_MODE ?
              <div>
                <Button className="editable-add-btn" onClick={() => this.add() }>Add</Button>
              </div>
              : ''
          }
          <Table
            dataSource={this.state.reqHeadData}
            columns={REQ_HEADER_COLUMN}
            bordered
            size='small'
            pagination={false}
            />
        </Row>
      </div>
    );
  };
}
