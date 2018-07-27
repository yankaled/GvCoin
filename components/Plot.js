import React, { Component } from 'react';
import dynamic from 'next/dynamic'

const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  });

class App extends Component {
    render() {
        return (
        <Plot
            data={[
                {
                    x: [5],
                    y: [10],
                    mode: 'markers',
                    name: 'GvCoins da Entidade',
                    marker: {
                        color: ['rgb(93, 164, 214)'],
                        opacity: [1],
                        size: [this.props.parameter_2, this.props.parameter_1]
                    }                
                },
                {
                    x: [10],
                    y: [10],
                    mode: 'markers',
                    name: 'Total de GvCoins',
                    marker: {
                        color: ['rgb(153, 50, 204)'],
                        opacity: [1],
                        size: [ this.props.parameter_1]                   
                    }
                }
            ]}
            layout={{width: 600, height: 300, title: 'GvConomy', xaxis: { showticklabels: false }, yaxis: { showticklabels: false }}}
        />
        );
    }
}

export default App;