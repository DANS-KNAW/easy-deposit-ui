import * as React from 'react'
import {Component} from 'react'

interface AppProps {

}

interface AppState {

}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
    }

    render() {
        return <h1>Hello World</h1>
    }
}

export default App
