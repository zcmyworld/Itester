import React from 'react';
import Reflux from 'reflux';

import { Row, Col, Card, Layout, Menu, Breadcrumb, Icon, Table, Collapse, Button, Input, Select, Checkbox, Popconfirm} from 'antd';

import Action from './action';
import Store from './store';

import ContentEditable from './../base/ContentEditable';




export default class Res extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {
  }

  drop(id, index) {
    let resGroup = this.state.project.res;
    for (let i in resGroup) {
      let res = resGroup[i];
      if (id == res.id) {
        resGroup[i].header.splice(index, 1)
        console.log(resGroup[i])
      }
    }
    Action.setKeyValue('res', resGroup);
  }

  add(id) {
    let resGroup = this.state.project.res;
    for (let i in resGroup) {
      let res = resGroup[i];
      if (id == res.id) {
        let newData = [{
          key: resGroup[i].header.length,
          arg: '',
          des: '',
        }];
        resGroup[i].header = resGroup[i].header.concat(newData);
      }
    }
    Action.setKeyValue('res', resGroup);
  }

  onChange() {
    console.log(this.refs)
    console.log('change')
    // var html = this.getDOMNode().innerHTML;

  }

  render() {
    let RES_HEADER_COLUMN = [
      {
        title: '参数',
        dataIndex: 'arg',
        key: 'arg'
      }, {
        title: '说明',
        dataIndex: 'des',
        key: 'des',
        render: (text, record, index) => {
          return (
            <div
              ref='ContentEditable'
              onInput={() => this.onChange() }
              contentEditable
              dangerouslySetInnerHTML={{ __html: text }}></div>
          )
        }
      }
    ];
    if (this.state.EDIT_MODE) {
      RES_HEADER_COLUMN.push({
        title: 'operation',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record, index) => {
          return (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.drop(record.id, index) }>
              <a href="#">Delete</a>
            </Popconfirm>
          )
        }
      })
    };
    return (
      <div>
        <Row>
          <Row className='api-title'>
            <h2>Response</h2>
          </Row>
          {
            this.state.project.res.map((item, idx) => {
              let resHeadData = [];
              item.header.map((header_item, idx) => {
                resHeadData.push({
                  key: idx,
                  arg: header_item.arg,
                  des: header_item.des,
                  id: item.id
                })
              })
              return (
                <div key={idx}>
                  <Row className='api-title'>
                    <h2>{item.name}</h2>
                  </Row>
                  <Row className='api-title'>
                    <h2>Response Header</h2>
                  </Row>
                  {
                    this.state.EDIT_MODE ?
                      <div>
                        <Button className="editable-add-btn" onClick={() => this.add(item.id) }>Add</Button>
                      </div>
                      : ''
                  }
                  <Row>
                    <Table
                      dataSource={resHeadData}
                      columns={RES_HEADER_COLUMN}
                      bordered
                      size='small'
                      pagination={false}
                      />
                  </Row>
                  <Row className='api-title'>
                    <h2>Response Body</h2>
                  </Row>
                  <Row>
                    {
                      this.state.EDIT_MODE ?
                        <Input type='textarea' autosize={true} defaultValue={JSON.stringify(item.body, null, 2) }/>
                        :
                        <pre >
                          { JSON.stringify(item.body, null, 2) }
                        </pre>
                    }
                  </Row>

                </div>
              )
            })
          }
        </Row>
      </div>
    );
  };
}
