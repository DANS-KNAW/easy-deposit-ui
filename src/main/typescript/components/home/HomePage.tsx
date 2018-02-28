import * as React from 'react'
import {Component} from 'react'

interface HomePageProps {

}

interface HomePageState {

}

class HomePage extends Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props)
    }

    render() {
        return <h1>Home Page</h1>
    }
}

export default HomePage
