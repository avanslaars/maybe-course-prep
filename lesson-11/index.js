class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({name: "Updated name"})
    }, 1000)
  }

  render () {
    const title = crocks.safe(Boolean, this.state.name)
      .map(str => str.toUpperCase())
      .option('default value')

    return <h1>{title}</h1>
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
