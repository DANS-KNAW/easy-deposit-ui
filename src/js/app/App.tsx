import * as React from 'react'
import {Component} from 'react'

interface AppProps {

}

interface AppState {
    counter: number
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {counter: 0}
    }

    render() {
        return (<div>
            <h1>Awesome counter: {this.state.counter}</h1>
            <button onClick={e => this.setState({counter: this.state.counter + 1})}>Increment</button>
        </div>)
    }
}

export default App
