import React, { Component } from 'react'
import { Menu, MenuItem } from 'semantic-ui-react'
import { Router } from '../routes';

export default class HeaderContentProp extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  backToLanding = async event => {
    event.preventDefault();
    Router.pushRoute(`/`);
  };

  render() {
    const { activeItem } = this.state

    return (
      <Menu fluid widths={7} style={{ borderRadius: '0px' }}>
        <img src="/static/logo_2.png" alt="my image" height="80" width="114"/>
        <Menu.Item target='_blank'
          name='landing'
          active={activeItem === 'landing'}
          content='Landing'
          onClick={this.backToLanding}
        />
        <Menu.Item href='http://gvcode.com.br/' target='_blank'
          name='gvcode'
          active={activeItem === 'gvcode'}
          content='GvCode'
          onClick={this.handleItemClick}
        />

        <Menu.Item href='https://eaesp.fgv.br/departamentos/departamento-tecnologia-e-ciencia-dados' target='_blank'
          name='tds'
          active={activeItem === 'tds'}
          content='TDS'
          onClick={this.handleItemClick}
        />

        <Menu.Item href='https://eaesp.fgv.br/escola/departamentos/APOI' target='_blank'
          name='poi'
          active={activeItem === 'poi'}
          content='POI'
          onClick={this.handleItemClick}
        />

        <Menu.Item href='https://eaesp.fgv.br/' target='_blank'
          name='fgv'
          active={activeItem === 'fgv'}
          content='FGV'
          onClick={this.handleItemClick}
        />
        <Menu.Item href='https://metamask.io/' target='_blank'
        name='Metamask'
        active={activeItem === 'Metamask'}
        content='Metamask'
        onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}