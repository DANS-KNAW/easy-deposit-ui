import * as React from "react"
import { Component } from "react"
import { Action } from "redux"
import { AppState } from "../../model/AppState"
import { connect } from "react-redux"
import * as H from "history"
import { createNewDeposit } from "../../actions/depositOverviewActions"

interface NewDepositButtonProps {
    creatingNew: boolean
    createNewDeposit: (pushHistory: (id: string) => void) => Action
    history: H.History
}

class NewDepositButton extends Component<NewDepositButtonProps> {
    createNewDeposit = () => {
        const {createNewDeposit, history} = this.props

        createNewDeposit(id => history.push(`/deposit-form/${id}`))
    }

    render() {
        return (
            <button className="btn btn-dark"
                    disabled={this.props.creatingNew}
                    title="Create new deposit..."
                    onClick={this.createNewDeposit}>{this.props.children}</button>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    creatingNew: state.deposits.creatingNew.creating
})

export default connect(mapStateToProps, {createNewDeposit})(NewDepositButton)
