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

import { Deposit, DepositId, Deposits, toDepositState } from "../../model/Deposits"

type DepositWithId = Deposit & { depositId: string }

export const depositsConverter: (input: any) => Deposits = input => {
    return input.map(depositConverter)
        .reduce((obj: Deposits, item: DepositWithId) => {
            obj[item.depositId] = ({
                title: item.title,
                state: item.state,
                stateDescription: item.stateDescription,
                date: item.date,
            })
            return obj
        }, {})
}

const depositConverter: (input: any) => DepositWithId = input => {
    const state = toDepositState(input.state)
    if (state)
        return {
            depositId: input.id,
            title: input.title ? input.title : "Untitled deposit",
            state: state,
            stateDescription: input.stateDescription,
            date: new Date(input.date),
        }
    else {
        // fail fast when an illegal deposit state is detected
        // error message is caught in depositOverviewMiddleware
        throw `Error in deposit ${input.id}: no such deposit state: '${input.state}'`
    }
}

export const newDepositConverter: (input: any) => DepositId = ({ id, state }) => {
    if (toDepositState(state))
        return id
    else
        throw `Error in deposit ${id}: no such value: '${state}'`
}
