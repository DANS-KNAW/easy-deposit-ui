import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {AppContainer} from "react-hot-loader"
import App from "./App"

const render = () => ReactDOM.render(<AppContainer><App/></AppContainer>, document.getElementById('app'))

render()

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept(() => render())
}
