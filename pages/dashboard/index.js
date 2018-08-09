import React, { Component } from 'react';
import { Card, Button, Form, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';
import gvcoin from '../../ethereum/gvcoin';
import RequestForm from '../../components/RequestForm';
import TransferForm from '../../components/TransferForm';
import Plot from '../../components/Plot';

class GvCoinIndex extends Component {
  state = {
    address: '',
    wealth: '',
    gvconomy: '',
    name: ''
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const society_index = await gvcoin.methods.getSocietyByAddress(accounts[0]).call();
    const societies = await gvcoin.methods.societies(society_index).call();
    const gvconomy = await gvcoin.methods.gvconomy().call();

    this.setState({
      address: societies.society_address,
      wealth: societies.wealth,
      gvconomy: gvconomy,
      name: societies.name
    });
  }

  renderCards() {
    const {
      address,
      wealth,
      gvconomy,
      name
    } = this.state;

    const items = [
      {
        header: address,
        meta: 'Endereço da Entidade',
        description:
          'Esta é a conta da Entidade na rede de testes Rinkeby',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: String(wealth),
        meta: 'Riqueza',
        description:
          'Volume de GvCoins controlado pela Entidade'
      },
      {
        header: String(gvconomy),
        meta: 'GvConomy',
        description:
          'Volume total de GvCoins na FGV'
      }
    ];

    return <Card.Group items={items} />;
  }
//Rendered with a trick to simulate a footer
  render() {
    return (
      <Layout>
        <div id="root">
          <h2 style={{ color: "#ffffff"}}>{this.state.name}</h2>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                      <h3 style={{ color: "white" }}>Dados da Entidade</h3>
                      {this.renderCards()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                      <RequestForm/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={10}>
                    <h3 style={{ color: "white" }}>Estatísticas</h3>
                    <Plot parameter_1={this.state.gvconomy} parameter_2={this.state.wealth}/>
                  </Grid.Column>

                  <Grid.Column width={6}>
                    <TransferForm/>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>                   
            </Grid>
        </div>
      </Layout>
    );
  }
}

export default GvCoinIndex;
