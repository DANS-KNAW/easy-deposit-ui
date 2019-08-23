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
import { DepositState } from "../../model/DepositState"
import { toDepositStateLabel } from "../../model/Deposits"

export function depositStateConverter(input: any): DepositState {
    const label = input.state && toDepositStateLabel(input.state)
    const description = input.stateDescription

    if (label)
        return ({
            label: label,
            description: description || "",
        })
    else
        throw `Error in deposit state: no such deposit state: '${input.state}'`
}
