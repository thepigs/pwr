import React, { Component } from 'react';
import { TimeSeries } from 'pondjs'
import {Brush,Charts,ChartContainer,ChartRow,YAxis,LineChart, Resizable} from 'react-timeseries-charts'
import Button from 'react-bootstrap/Button'
import { isNullOrUndefined } from 'util';

  export default class PowerChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        series: null,
        timerange: null,
        brushrange: null
      };
    }
    handleTimeRangeChange = timerange => {
      this.setState({ timerange });
  }
  handleBrushRangeChange = timerange => {
    console.log(timerange);
    this.setState({ brushrange:timerange });
}

  resetZoom = () => {
    this.setState({
      timerange:this.state.series.range()
    });
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
            console.log(error);
            this.setState({
              error
            });
          }
        )
    }
    
    render() {
      return (
this.state.isLoaded && (
  <>
  <Resizable>
<ChartContainer timeRange={this.state.timerange} onTimeRangeChanged={this.handleTimeRangeChange} enablePanZoom={true}>


        <ChartRow height="200">
        {/* <Brush
                        timeRange={this.state.brushrange}
                        allowSelectionClear
                        onTimeRangeChanged={this.handleBrushRangeChange}
                    /> */}
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
    </ChartContainer>
    </Resizable>
    <Button onClick={this.resetZoom}>Reset Zoom</Button></> )
);
    }
  }
  
  