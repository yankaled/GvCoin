import React, { Component } from 'react';
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react';
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
    if( this.state.access_token == "IMQ" ){
      Router.pushRoute(`/admin_dashboard`);
    }else if( this.state.access_token == "GvCode") {
      Router.pushRoute(`/society_dashboard`);
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
          Ooi! Para usar a GvCoin você precisa do plugin Metamask. <br/> 
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
        <div>
          <h2 style={{ color: "#ffffff"}}>GvCoin</h2>
          <Form onSubmit={this.onSubmit}>
            <h3 style={{ color: "#ffffff"}}> Token de Acesso: </h3>
            <Form.Input
             placeholder='Insira o token para entrar no sistema'
             value={this.state.access_token}
             onChange={event =>
              this.setState({ access_token: event.target.value })} 
            />
            <Button color="violet">Enviar</Button>
          </Form>
          {this.renderModal(this.state.open_modal)}
          <div className="codeLogoLanding">
            <img src="/static/logo_2.png" alt="my image"/>
          </div>  
        </div>
      </Layout>
    );
  }
}

export default GvCoinIndex;
