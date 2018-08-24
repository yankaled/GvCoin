import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import gvcoin from '../ethereum/gvcoin';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RequestForm extends Component {
  state = {
    value: '',
    description: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    const { value, description} = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await gvcoin.methods.createRequest(description, value, accounts[0]).send({
        from: accounts[0]
      });

      Router.replaceRoute(`/society_dashboard`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '', description: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
            <h3 style={{ color: "white" }}>Mais GvCoins!!</h3>
            <label style={{ color: "white" }}>Quantia: </label>
            <Input
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
                label="GvCoins"
                labelPosition="right"
            />

            <label style={{ color: "white", marginTop: "10px" }}> Por que você quer mais GvCoins??? </label>
            <Input
                value={this.state.description}
                onChange={event => this.setState({ description: event.target.value })}
            />
        </Form.Field>

        <Message error header="Oops, ocorreu um erro na transação!" >
          <h4 style={{ color: '#8b0000' }}>Oops! Ocorreu um erro na transação: </h4>
          {this.state.errorMessage}
        </Message>
        <Button color ="violet" animated='fade' loading={this.state.loading}>
          <Button.Content visible> Requisitar GvCoins </Button.Content>
          <Button.Content hidden>Confirmar requisito</Button.Content>
        </Button>
      </Form>
    );
  }
}

export default RequestForm;
