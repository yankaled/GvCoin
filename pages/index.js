import React, { Component } from 'react';
import { Button, Form, Header, Icon, Modal, Grid, Responsive } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Router } from '../routes';
import web3 from '../ethereum/web3';

class GvCoinIndex extends Component {
  state = {
    access_token: '',
    net: '',
    open_modal: false
  };

  async componentDidMount() {
    const net = await web3.eth.net.getNetworkType();
    this.setState({ net });
    
    if(net != 'rinkeby'){
      this.setState({ open_modal: true });
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    if(this.state.net == 'rinkeby'){
      if( this.state.access_token == "IMQ" ){
        Router.pushRoute(`/admin_dashboard`);
      }else if( this.state.access_token == "GvCode") {
        Router.pushRoute(`/society_dashboard`);
      };
    } else {
      this.setState({ open_modal: true });
    };
  };

  handleClick = () => {
    this.setState({
      open_modal: false
    });
  };

  renderModal(open) {
    return(
      <Modal open={open} basic>
        <Header icon='exclamation circle' content='Rinkeby não encontrada!' />
        <Modal.Content>
          <h3>
          Oooi! Para usar a GvCoin você precisa do plugin Metamask. <br/> <br/> 
          Para habilitar o Metamask no seu navegador clique no container 
          do canto direito da página e siga as intruções. <br/> <br/>
          Não se esqueça de selecionar a rede "Rinkeby" no Metamask para a GvCoin funcionar ;)
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClick} color='red'>
            <Icon name='remove' /> Fechar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h2 style={{ color: "#ffffff"}}>GvCoin</h2>
              <Form onSubmit={this.onSubmit}>
                <h3 style={{ color: "#ffffff"}}> Token de Acesso: </h3>
                <Form.Input
                placeholder='Insira o token para entrar no sistema'
                value={this.state.access_token}
                onChange={event =>
                  this.setState({ access_token: event.target.value })} 
                />
                <Button animated='fade' positive>
                  <Button.Content visible> Validar token de acesso </Button.Content>
                  <Button.Content hidden>Começar</Button.Content>
                </Button>
              </Form>
              {this.renderModal(this.state.open_modal)}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Responsive maxWidth={1200}>
                <img src="/static/logo_2.png" alt="my image" height="448" width="638.4"/>
              </Responsive>
            </Grid.Column>

            <Responsive minWidth={1201}>
              <Grid.Column>
                <img src="/static/logo_2.png" alt="my image"/>
              </Grid.Column>
            </Responsive>

          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default GvCoinIndex;
