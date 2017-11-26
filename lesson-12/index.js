const isNonEmptyString = str => Boolean(str) && typeof str === 'string'

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

  // this.state.name could throw an exception if it isn't a string
  // Additionally, we'd like to show the default value if the string is empty
  // We need a predicate that will ensure a non-empty string
  // This also works if name is not defined on the initial state, so: `this.state = {}`
  render () {
    // console.log(typeof this.state.name)
    const title = crocks.safe(isNonEmptyString, this.state.name)
      .map(str => str.toUpperCase())
      .option('loading...')

    return <h1>{title}</h1>
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
