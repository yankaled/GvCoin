import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Router } from '../routes';

class GvCoinIndex extends Component {
  state = {
    access_token: ''
  };

  onSubmit = async event => {
    event.preventDefault();
    if( this.state.access_token == "IMQ" ){
      Router.pushRoute(`/admin_dashboard`);
    }else if( this.state.access_token == "GvCode") {
      Router.pushRoute(`/society_dashboard`);
    };

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
          <div className="codeLogoLanding">
            <img src="/static/logo_2.png" alt="my image"/>
          </div>  
        </div>
      </Layout>
    );
  }
}

export default GvCoinIndex;
