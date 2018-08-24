import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import gvcoin from '../ethereum/gvcoin';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class CreateSocietyForm extends Component {
    state = {
      name: '',
      address: '',
      errorMessage: '',
      loading: false
    };
  
    onSubmit = async event => {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: '' });
      const { name, address } = this.state;
  
      try {
        const accounts = await web3.eth.getAccounts();
        await gvcoin.methods.createSociety(name, address).send({
          from: accounts[0]
        });
  
        Router.replaceRoute(`/admin_dashboard`);
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
  
      this.setState({ loading: false, name: '', address: '' });
    };
  
    render() {
      return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
              <h3 style={{ color: "white" }}>Crie uma sociedade: </h3>
              <label style={{ color: "white" }}>Nome: </label>
              <Input
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  label="GvCoins"
                  labelPosition="right"
              />
  
              <label style={{ color: "white", marginTop: "10px" }}> Endereço na Rinkeby: </label>
              <Input
                  value={this.state.address}
                  onChange={event => this.setState({ address: event.target.value })}
              />
          </Form.Field>
  
          <Message error header="Oops, ocorreu um erro na transação!" >
          <h4 style={{ color: '#8b0000' }}>Oops! Ocorreu um erro na transação: </h4>
          {this.state.errorMessage}
          </Message>
          <Button color ="violet" loading={this.state.loading}>
            Criar
          </Button>
        </Form>
      );
    }
  }
  
  export default CreateSocietyForm;
  