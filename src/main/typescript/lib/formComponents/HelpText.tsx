/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react"
import { connect } from "react-redux"
import Loading from "../../components/Loading"
import { AppState } from "../../model/AppState"
import { PromiseAction, ReduxAction } from "../redux"
import { fetchHelpText, registerHelpText, unregisterHelpText } from "../../actions/helpTextActions"
import { getHelpTextState } from "../../selectors/helpTexts"

interface HelpTextInputProps {
    textFor: string
}

interface HelpTextProps {
    helpTextVisible: boolean
    helpTextFetching: boolean,
    helpTextFetched: boolean,
    helpText: string,
    helpTextFetchError?: string

    registerHelpText: (fieldName: string) => ReduxAction<string>
    unregisterHelpText: (fieldName: string) => ReduxAction<string>
    fetchHelpText: (fieldName: string) => PromiseAction<void>
}

class HelpText extends React.Component<HelpTextProps & HelpTextInputProps> {
    constructor(props: HelpTextProps & HelpTextInputProps) {
        super(props)
        this.props.registerHelpText(this.props.textFor)
    }

    async componentDidMount() {
        this.props.fetchHelpText(this.props.textFor)
    }

    componentWillUnmount() {
        this.props.unregisterHelpText(this.props.textFor)
    }

    render() {
        const loading = <Loading/>
        const helpText = <div className="help-text" dangerouslySetInnerHTML={{ __html: this.props.helpText }}/>
        const error = <i style={{ color: "red" }}>{this.props.helpTextFetchError}</i>

        return this.props.helpTextVisible
            ? <>
                {this.props.helpTextFetching && loading}
                {this.props.helpTextFetched && helpText}
                {this.props.helpTextFetchError && error}
            </>
            : null
    }
}

const mapStateToProps = (state: AppState, props: HelpTextInputProps) => {
    const { visible, fetching, fetched, text, fetchError } = getHelpTextState(props.textFor)(state)

    return {
        helpTextVisible: visible,
        helpTextFetching: fetching,
        helpTextFetched: fetched,
        helpText: text,
        helpTextFetchError: fetchError,
    }
}

export default connect(mapStateToProps, {
    registerHelpText,
    unregisterHelpText,
    fetchHelpText,
})(HelpText)
