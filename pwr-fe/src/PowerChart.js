import React, { Component } from 'react';
import { TimeSeries } from 'pondjs'
import {Charts,ChartContainer,ChartRow,YAxis,LineChart} from 'react-timeseries-charts'

  export default class PowerChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        series: {}
      };
    }
    handleTimeRangeChange = timerange => {
      this.setState({ timerange });
  }
      resetZoom(){
      console.log(this.refs.chart.chartInstance.resetZoom())
    }
    componentDidMount() {
      fetch("http://localhost:8081/power")
        .then(res => res.json())
        .then(
          (result) => {
            const points = result.map(d => [new Date(d.date).getTime(), d.sum ] ).reverse()
            const series = new TimeSeries({name:'power',columns:['time','value'],points})
            console.log(series.min()+' '+series.max())

            this.setState({
              series,
              isLoaded:true,
              timerange:series.range()
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              error
            });
          }
        )
    }
    
    render() {
      return (
this.state.isLoaded && (
<ChartContainer timeRange={this.state.timerange} onTimeRangeChanged={this.handleTimeRangeChange} enablePanZoom={true}>


        <ChartRow height="150">
            <YAxis
                id="pulses"
                label="Pulses"
                min={0} max={this.state.series.max()}
                format=",.1d"
                width="60" />
            <Charts>
                <LineChart axis="pulses" series={this.state.series} />
            </Charts>
        </ChartRow>
    </ChartContainer> )
);
    }
  }
  
  