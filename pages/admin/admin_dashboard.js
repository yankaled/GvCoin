import React, { Component } from 'react';
import { Card, Button, Form, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';
import gvcoin from '../../ethereum/gvcoin';
import RequestForm from '../../components/RequestForm';
import TransferForm from '../../components/TransferForm';
import Plot from '../../components/Plot';
import CreateSocietyForm from '../../components/CreateSocietyForm';

class AdminIndex extends Component {
  state = {
    gvconomy: '',
    societies: '',
    requests: '',
    accounts: ''
  };

  //==========================================================================
  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    const gvconomy = await gvcoin.methods.gvconomy().call();
    const requests_length = await gvcoin.methods.getRequestsLength().call();
    const societies_length = await gvcoin.methods.getSocietiesLength().call();

    const requests = await Promise.all(
      Array(parseInt(requests_length))
        .fill()
        .map((element, index) => {
          return gvcoin.methods.requests(index).call();
        })
    );

    const societies = await Promise.all(
      Array(parseInt(societies_length))
      .fill()
      .map((element, index) => {
        return gvcoin.methods.societies(index).call();
      })
    );

    return { societies, requests, gvconomy, accounts };

    // this.setState({
    //   requests: requests,
    //   accounts: accounts,
    //   societies: societies,
    //   gvconomy: gvconomy
    // });
  }
  //=============================================================================

  renderRequests() {
    const items = this.props.requests.map(request => {
      return {
        header: request[2],
        description: ([
          "Quantia: ", request[1], <br/>,
          "Descrição: ", request[0]]
        ),
        fluid: true 
      };
    });

    return <Card.Group items={items} />;
  }

  renderReq() {
    return(
      <Card.Group>
          {this.props.requests.map((request) => (
            <Card
              key={request[0]}
              header={request[2]}
              description={
                ["Quantia: ", request[1], <br/>,
                  "Descrição: ", request[0]]
              }
              fluid={true}

            />
          ))}
      </Card.Group>
    );
  }


  render() {
    return (
      <Layout>
        <div>
          <h2 style={{ color: "#ffffff"}}>Admin</h2>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                      <h3 style={{ color: "white" }}>Requisições de GvCoins: </h3>
                        {this.renderReq()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                      <CreateSocietyForm/>
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

export default AdminIndex;
