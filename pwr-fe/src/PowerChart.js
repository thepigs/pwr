const data = {
    datasets: [{
      label: 'Dataset with string point data',
      backgroundColor: 'rgba(200,200,200,0.2)',
      borderColor: 'rgba(20,20,20,1)',
      fill: false,
    }]
  }
  
  const options = {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Time Point Data'
    },
    pan: {
      enabled: true,
      mode: 'x'
    },
    zoom: {
      enabled: true,
      mode: 'x',
      drag: true
    },
    scales: {
      xAxes: [{
        type: 'time',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: '#FF0000'
          }
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
        beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'value'
        }
      }]
    }
  }
  
  
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: []
      };
    }
  
    resetZoom(){
      console.log(this.refs.chart.chartInstance.resetZoom())
    }
    componentDidMount() {
      fetch("http://localhost:8081/power")
        .then(res => res.json())
        .then(
          (result) => {
            data.datasets[0].data=result.map(d => { return { x: new Date(d.date), y: d.sum } })
            this.setState({
              isLoaded: true,
              items: data
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    render() {
      return (
        <div className="App">
        <Header/>
          {this.state.isLoaded && 
          <Line ref="chart" data={data} options={options} />
          }
          <button onClick={()=>this.resetZoom()}>Reset Zoom</button>
        </div>
      );
    }
  }
  
  