import * as React from 'react'
import {Component} from 'react'

interface NotFoundPageProps {

}

interface NotFoundPageState {

}

class NotFoundPage extends Component<NotFoundPageProps, NotFoundPageState> {
    constructor(props: NotFoundPageProps) {
        super(props)
    }

    render() {
        return <h1>Page not found</h1>
    }
}

export default NotFoundPage
