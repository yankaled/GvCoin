import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class HeaderContentProp extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted stackable borderless style={{ borderRadius: '0px' }}>
        <img src="/static/logo_2.png" alt="my image" height="80" width="114"/>
        <Menu.Item/>
        <Menu.Item href='http://gvcode.com.br/' target='_blank'
          name='gvcode'
          active={activeItem === 'gvcode'}
          content='GvCoin 2018, © GvCode'
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}