import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes';

export default class HeaderContentProp extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{ borderRadius: '0px' }}>
        <img src="/static/logo_2.png" alt="my image" height="80" width="114"/>
        <Menu.Item/>
        <Menu.Item href='http://gvcode.com.br/' target='_blank'
          name='gvcode'
          active={activeItem === 'gvcode'}
          content='GvCode'
          onClick={this.handleItemClick}
        />

        <Menu.Item href='https://eaesp.fgv.br/escola/departamentos/imqaa' target='_blank'
          name='imq'
          active={activeItem === 'imq'}
          content='IMQ'
          onClick={this.handleItemClick}
        />

        <Menu.Item href='https://eaesp.fgv.br/departamentos/departamento-administracao-producao-e-operacoes' target='_blank'
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
      </Menu>
    )
  }
}