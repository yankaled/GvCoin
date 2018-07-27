import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import gvcoin from '../ethereum/gvcoin';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RequestForm extends Component {
  state = {
    value: '',
    recipient_name: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    const { value, recipient_name} = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      const society_index = await gvcoin.methods.getSocietyByAddress(accounts[0]).call();
      const recipient_society = await gvcoin.methods.getSocietyByName(recipient_name).call();
      await gvcoin.methods.transferGvCoins(value, society_index, recipient_society).send({
        from: accounts[0]
      });

      Router.replaceRoute(`/dashboard/index`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '', description: '' });
    Router.pushRoute(`/dashboard/index`);
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
            <h3 style={{ color: "white" }}>Transferir GvCoins</h3>
            <label style={{ color: "white" }}>Quantia: </label>
            <Input
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
                label="GvCoins"
                labelPosition="right"
            />

            <label style={{ color: "white", marginTop: "10px" }}> Para qual entidade você deseja enviar GvCoins? </label>
            <Input
                value={this.state.description}
                onChange={event => this.setState({ recipient_name: event.target.value })}
                placeholder="Nome da Entidade"
            />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button color ="blue" loading={this.state.loading}>
          Enviar
        </Button>
      </Form>
    );
  }
}

export default RequestForm;
