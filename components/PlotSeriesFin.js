import React, { Component } from 'react';
import dynamic from 'next/dynamic'
import gvcoin from '../ethereum/gvcoin';

const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
  });

class App extends Component {
    render() {
        return (
        <Plot
            data={[
                {
                    x: Array(this.props.finSeries[this.props.society_index].length).fill().map((element, index) => index + 1),
                    y: this.props.finSeries[this.props.society_index].map(function(x){return parseInt(x)}),
                    mode: 'line',
                    name: 'Série Temporal de Receitas',
                    marker: {
                        color: ['rgb(93, 164, 214)'],
                        opacity: [1]
                        // size: [this.props.parameter_2, this.props.parameter_1]
                    }                
                }
            ]}
            layout={{width: 600, height: 300, title: 'GvConomy - Série de Financiamentos', xaxis: { showticklabels: true, showgrid: true }, 
            yaxis: { showticklabels: true, showgrid:true }}}
        />
        );
    }
}

export default App;