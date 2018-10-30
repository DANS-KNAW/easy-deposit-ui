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
import "../../../resources/css/foldable"
import { connect } from "react-redux"
import { AppState } from "../../model/AppState"
import { ReduxAction } from "../../lib/redux"
import { registerCard, toggleCard, unregisterCard } from "../../actions/foldableCardActions"

interface FoldableCardInputProps {
    title: string
    required?: boolean
    defaultOpened?: boolean
}

interface FoldableCardProps {
    open: boolean

    registerCard: (id: string, open: boolean) => ReduxAction<{ id: string, open: boolean }>
    unregisterCard: (id: string) => ReduxAction<string>
    toggleCard: (id: string) => ReduxAction<string>
}

class FoldableCard extends Component<FoldableCardProps & FoldableCardInputProps> {
    constructor(props: FoldableCardProps & FoldableCardInputProps) {
        super(props)
        this.props.registerCard(this.props.title, this.props.defaultOpened || false)
    }

    componentWillUnmount() {
        this.props.unregisterCard(this.props.title)
    }

    collapseCard = () => {
        this.props.toggleCard(this.props.title)
    }

    render() {
        const { title, required, open, children } = this.props

        return (
            <div className={`${open ? "" : "closed"} card mb-3`.trim()}>
                <h6 className="card-header row ml-0 mr-0 bg-primary text-white" onClick={this.collapseCard}>
                    <div className="col-11 order-1 col-md-9 order-md-1 pl-0 pr-0 font-weight-bold">{title}</div>
                    {required
                        ? <div
                            className="col-12 order-3 col-md-2 order-md-2 pl-0 pr-0 font-italic required">Required</div>
                        : <div className="col-12 order-3 col-md-2 order-md-2 pl-0 pr-0"/>}
                    <div className="col-1 order-2 col-md-1 order-md-3 pl-0 pr-0 arrow">
                        <i className={[
                            "fas",
                            open ? "fa-chevron-circle-down" : "fa-chevron-circle-right",
                        ].join(" ").trim()}/>
                    </div>

                </h6>
                <div className={[
                    open ? "" : "collapse",
                    "card-body ml-0 mr-0",
                ].join(" ").trim()}>{children}</div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState, props: FoldableCardInputProps) => ({
    open: state.foldableCards[props.title]
        ? state.foldableCards[props.title].open
        : props.defaultOpened || false,
})

export default connect(mapStateToProps, {
    toggleCard,
    registerCard,
    unregisterCard,
})(FoldableCard)
