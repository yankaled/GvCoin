import React, { Component } from 'react';
import { Card, Button, Form, Message, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';
import GvCoin from '../../ethereum/gvcoin';

class GvCoinIndex extends Component {
  state = {
    
  };
  static async getInitialProps(props) {

    const societies = await GvCoin.methods.societies(0).call();
    const gvconomy = await GvCoin.methods.gvconomy().call();

    return {
      address: societies.society_address,
      wealth: societies.wealth,
      gvconomy: gvconomy
    };
  }

  renderCards() {
    const {
      address,
      wealth,
      gvconomy
    } = this.props;

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
        meta: 'Riqueza da Entidade',
        description:
          'Volume de GvCoins controlado pela Entidade'
      },
      {
        header: String(gvconomy),
        meta: 'Volume total de GvCoins na FGV',
        description:
          'Volume total de GvCoins na FGV'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h2 style={{ color: "#ffffff"}}>GvCode</h2>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

                    <Grid.Column width={6}>
                        <p>Teste</p>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
      </Layout>
    );
  }
}

export default GvCoinIndex;
