import React, { Component } from 'react';
import { Card, Button, Form, Input, Message, Grid, Pagination, Icon } from 'semantic-ui-react';
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
    activePage: 1
  }

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

    return { societies, requests, gvconomy, accounts, requests_length };
  }
  //=============================================================================
  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  renderCards(index_2) {
    return(
      <Card.Group>
          {this.props.requests.map((request, index) => {
            if ( (index >= index_2 - 1 && index <= index_2) || (index_2 == 1 && index < index_2 + 1 ) ) {
              return ( 
              <Card fluid>
                <Card.Content>
                  <Card.Header>{request[2]}</Card.Header>
                  <Card.Description>
                  {"Quantia: "} {request[1]} {<br/>}
                  {"Descrição: "} {request[0]}
                  </Card.Description>
                  <Button basic color="green">Aprovar</Button>
                </Card.Content>
              </Card>
              );
            }
          })}
      </Card.Group>
    );
  }

  render() {
    const { activePage } = this.state
    return (
      <Layout>
        <div>
          <h2 style={{ color: "#ffffff"}}>Admin</h2>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                      <h3 style={{ color: "white" }}>Requisições de GvCoins: </h3>
                        {this.renderCards(activePage)}
                        <br/>
                        <Pagination
                          defaultActivePage={this.state.activePage} 
                          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                          prevItem={{ content: <Icon name='angle left' />, icon: true }}
                          nextItem={{ content: <Icon name='angle right' />, icon: true }}
                          totalPages={this.props.requests_length - 1}
                          onPageChange={this.handlePaginationChange}
                        />
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
