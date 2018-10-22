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
import { toggleHelpText } from "../../actions/helpTextActions"
import { ReduxAction } from "../redux"
import { AppState } from "../../model/AppState"

interface HelpButtonInputProps {
    textFor: string
}

interface HelpButtonProps {
    toggled: boolean

    toggleHelpText: (fieldName: string) => ReduxAction<string>
}

class HelpButton extends React.Component<HelpButtonProps & HelpButtonInputProps> {
    toggleHelpText = () => this.props.toggleHelpText(this.props.textFor)

    render() {
        const className = "fas fa-info-circle help" + (this.props.toggled ? " toggled" : "")
        return <i className={className} onClick={this.toggleHelpText}/>
    }
}

const mapStateToProps = (state: AppState, props: HelpButtonInputProps) => ({
    toggled: state.helpTexts[props.textFor]
        ? state.helpTexts[props.textFor].visible
        : false,
})

export default connect(mapStateToProps, { toggleHelpText })(HelpButton)
