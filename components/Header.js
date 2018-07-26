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
          name='editorials'
          active={activeItem === 'editorials'}
          content='Editorials'
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          content='Reviews'
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          content='Upcoming Events'
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}