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
import { Component } from "react"
import axios from "axios"

interface HelpButtonState {
    helpText: string
    fetchingHelpText: boolean
    fetchedHelpText: boolean
    fetchError?: string
}

interface HelpButtonProps {
    textFor: string
}

class HelpButton extends Component<HelpButtonProps, HelpButtonState> {
    constructor(props: HelpButtonProps) {
        super(props)
        this.state = {
            helpText: "",
            fetchingHelpText: false,
            fetchedHelpText: false,
            fetchError: undefined,
        }
    }

    async componentDidMount() {
        this.setState(prevState => ({ ...prevState, fetchingHelpText: true }))

        console.log(`fetching ${this.props.textFor}`)
        const response = await axios.get(require(`../../../resources/helptexts/${this.props.textFor}.html`))
        this.setState(prevState => response.status == 200
            ? {
                ...prevState, helpText: response.data, fetchingHelpText: false, fetchedHelpText: true,
            }
            : {
                ...prevState, fetchingHelpText: false, fetchedHelpText: false, fetchError: "helptext not available",
            })

        console.log(`fetched ${this.props.textFor}`, response.data)
    }

    render() {
        const loading = <p>Loading help text...</p>
        const helpText = <div dangerouslySetInnerHTML={{ __html: this.state.helpText }}/>
        const error = <p>{this.state.fetchError}</p>

        const modalId = `${this.props.textFor}Modal`
        const modalLabel = `${this.props.textFor}ModalLabel`

        return (
            <>
                <i className="fas fa-info-circle help" data-toggle="modal" data-target={`#${modalId}`}/>

                {/* Modal, only visible on click */}
                <div className="modal fade" id={modalId} tabIndex={-1} role="dialog"
                     aria-labelledby={modalLabel} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id={modalLabel}>Help</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.fetchingHelpText && loading}
                                {this.state.fetchedHelpText && helpText}
                                {this.state.fetchError && error}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default HelpButton
