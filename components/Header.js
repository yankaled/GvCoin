import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes';

export default class MenuExampleContentProp extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{ borderRadius: '0px' }}>
        <Menu.Item
          name='inicio'
          active={activeItem === 'inicio'}
          content='Inicio'
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='entidades'
          active={activeItem === 'entidades'}
          content='Entidades'
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='fgv'
          active={activeItem === 'fgv'}
          content='FGV'
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}