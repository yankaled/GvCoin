import React, { Component } from 'react';
import { Card, Button, Form, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';
import gvcoin from '../../ethereum/gvcoin';
import RequestForm from '../../components/RequestForm';
import TransferForm from '../../components/TransferForm';
import Plot from '../../components/Plot';
import { resolve } from 'path';

class GvCoinIndex extends Component {
  state = {
    gvconomy: '',
    requests_length: '',
    societies_length: '',
    socs: ''
  };

  //==========================================================================
  async componentDidMount() {
    const society = await gvcoin.methods.societies(0).call();
    const requests_length = await gvcoin.methods.getRequestsLegth().call();
    const societies_length = await gvcoin.methods.getSocietiesLength().call();
    const accounts = await web3.eth.getAccounts();
    const gvconomy = await gvcoin.methods.gvconomy().call();

    this.setState({
      gvconomy: gvconomy,
      requests_length: requests_length,
      societies_length: societies_length
    });
  }
  //=============================================================================


  render() {
    return (
      <Layout>
        <div>
          <h2 style={{ color: "#ffffff"}}>Admin</h2>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                      <h3 style={{ color: "white" }}>Entidades</h3>
                    </Grid.Column>

                    <Grid.Column width={6}>
                      <RequestForm/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width={10}>
                    <h3 style={{ color: "white" }}>Estatísticas</h3>
                    <Plot/>
                  </Grid.Column>

                  <Grid.Column width={6}>
                    <TransferForm/>
                  </Grid.Column>
                </Grid.Row>                
            </Grid>
        </div>
      </Layout>
    );
  }
}

export default GvCoinIndex;
