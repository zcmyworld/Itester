import React from 'react';
import Reflux from 'reflux';

import { Menu } from 'antd';


const SubMenu = Menu.SubMenu;

import Action from './action';
import Store from './store';

export default class ProjectMenu extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Store];
  }

  componentDidMount() {

  }

  render() {
    return (
      <Menu
        theme='Light'
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={{ 'marginLeft': '-24px' }}
        >
        {
          this.state.menu.map((item, idx) => {
            return (
              <SubMenu key={idx} title={<span><span>{item.name}</span></span>}>
                {
                  item.childs.map((child_item, child_idx) => {
                    return (
                      <Menu.Item key={idx.toString() + child_idx.toString() }>{child_item.name}</Menu.Item>
                    );
                  })
                }
              </SubMenu>
            )
          })

        }
      </Menu>
    );
  };
}
