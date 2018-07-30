import React, { Component } from 'react';
import { Card, Button, Form, Input, Message, Grid, Pagination, Icon, Table } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import web3 from '../../ethereum/web3';
import gvcoin from '../../ethereum/gvcoin';
import PlotSeriesFin from '../../components/PlotSeriesFin';
import PlotSeriesRev from '../../components/PlotSeriesRev';
import CreateSocietyForm from '../../components/CreateSocietyForm';

class AdminIndex extends Component {
  state = {
    activePage: 1,
    errorMessage: '',
    loading: false,
    society_chosen: '',
    choice: 1
  }

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

    const revSeries = await Promise.all(
      Array(parseInt(societies_length))
      .fill()
      .map((element, index) => {
        return gvcoin.methods.getRev(societies[index].name).call();
      })
    );

    const finSeries = await Promise.all(
      Array(parseInt(societies_length))
      .fill()
      .map((element, index) => {
        return gvcoin.methods.getFin(societies[index].name).call();
      })
    );

    return { societies, requests, gvconomy, accounts, requests_length, revSeries, finSeries };
  }
  //=============================================================================
  // General functions for GvCoin's Admin Dashboard
  //=============================================================================
  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  graphChange = async event => {
    event.preventDefault();
    this.setState({ choice: this.state.choice*(-1) });
  };

  async onApprove (request, index, e){
    e.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await gvcoin.methods.approveRequest( index, request[3],request[1]).send({
        from: accounts[0]
      });

      Router.replaceRoute(`/admin/admin_dashboard`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '', description: '' });
  };

  renderCards(index_2) {
    return(
      <Card.Group>
          {this.props.requests.map((request, index) => {
            if ( (index >= index_2 - 1 && index <= index_2) || (index_2 == 1 && index < index_2 + 1 ) ) {
              return ( 
              <Card fluid>
                <Card.Content>
                  <Card.Header>{request[3]}</Card.Header>
                  <Card.Description>
                  {"Quantia: "} {request[1]} {<br/>}
                  {"Descrição: "} {request[0]}
                  </Card.Description>
                  {request.accepted ? <Button basic color="violet" loading={this.state.loading}>Aprovada!</Button> : (
                    <Button basic color="green" onClick={(e) => this.onApprove(request, index, e)}>
                      Aprovar
                    </Button>
                  )}
                </Card.Content>
              </Card>
              );
            }
          })}
      </Card.Group>
    );
  }

  renderSocieties() {
    return(
      <Card.Group>
        {this.props.societies.map((society) => {
          return(
            <Card>
              <Card.Content>
                <Card.Header>{society[3]}</Card.Header>
                <Card.Description>
                  {"Riqueza: "} {society[0]} {<br/>}
                  {"Receita Total: "} {society[1]} {<br/>}
                  {"Total Financiado: "} {society[2]}
                </Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  }

  renderGraph(chosen) {
    if(chosen == 1){
      return <PlotSeriesRev revSeries={this.props.revSeries} societies={this.state.society_chosen}/>;
    }else {
      return <PlotSeriesFin finSeries={this.props.finSeries} society={this.state.society_chosen}/>;
    }
  }
  //================================================================================

  render() {
    const { activePage, choice, society_chosen } = this.state
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
                     {this.renderGraph(choice)}
                     <br/>
                      <Button color="violet" onClick={this.graphChange}>Trocar</Button>
                  </Grid.Column>
                      
                  <Grid.Column width={6}>
                    <h3 style={{ color: "white" }}>Lista de Entidades: </h3>
                    {this.renderSocieties()}
                  </Grid.Column>
                </Grid.Row>                
            </Grid>
        </div>
      </Layout>
    );
  }
}

export default AdminIndex;
