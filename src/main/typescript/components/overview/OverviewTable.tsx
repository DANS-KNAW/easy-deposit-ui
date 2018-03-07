import * as React from "react"
import { Component } from "react"
import { Deposit } from "../../model/Deposit"
import { connect } from "react-redux"
import { AppState } from "../../model/AppState"
import { fetchDeposits } from "../../actions/depositActions"
import { ReduxAction } from "../../lib/redux"
import DepositRow from "./DepositRow"

const TableHead = () => (
    <tr>
        <th scope="col">Dataset</th>
        <th scope="col">Date</th>
        <th scope="col">State</th>
        <th scope="col">Notes</th>
    </tr>
)

interface OverviewTableProps {
    deposits: Deposit[]
    fetchDeposits: () => ReduxAction<Promise<Deposit[]>>
}

class OverviewTable extends Component<OverviewTableProps> {
    constructor(props: OverviewTableProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchDeposits()
    }

    render() {
        const { deposits } = this.props

        return (
            <table className="table table-hover">
                <thead><TableHead/></thead>
                <tbody>{deposits.map(deposit => <DepositRow key={deposit.id} deposit={deposit}/>)}</tbody>
            </table>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    deposits: state.deposits,
})

export default connect(mapStateToProps, { fetchDeposits })(OverviewTable)
