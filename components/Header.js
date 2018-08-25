import React, { Component } from 'react'
import { Menu, MenuItem, Image } from 'semantic-ui-react'
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
        <Image
          src="/static/logo_2.png"
          href='/'
          height="80"
          width="114"
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

        <Menu.Item href='https://pesquisa-eaesp.fgv.br' target='_blank'
          name='gvpesquisa'
          active={activeItem === 'gvpesquisa'}
          content='GvPesquisa'
          onClick={this.handleItemClick}
        />

        <Menu.Item href='https://eaesp.fgv.br/' target='_blank'
          name='fgv'
          active={activeItem === 'fgv'}
          content='FGV'
          onClick={this.handleItemClick}
        />
        <Menu.Item href='http://www.cnpq.br/' target='_blank'
          name='cnpq'
          active={activeItem === 'cnpq'}
          content='CNPq'
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