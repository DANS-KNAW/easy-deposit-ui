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
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createNewDeposit } from "../../actions/depositOverviewActions"
import { useSelector } from "../../lib/redux"

const NewDepositButton: FC = ({ children }) => {
    const creatingNew = useSelector(state => state.deposits.creatingNew.creating)
    const history = useHistory()
    const dispatch = useDispatch()
    const doCreateNewDeposit = () => dispatch(createNewDeposit(history))

    return (
        <button type="button"
                className="btn btn-dark margin-top-bottom"
                disabled={creatingNew}
                title="Create new deposit..."
                onClick={doCreateNewDeposit}>{children}</button>
    )
}

export default NewDepositButton
