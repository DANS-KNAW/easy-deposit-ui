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

const DepositTableHead = () => (
    <thead>
    <tr className="row">
        {/* these column sizes need to match with the sizes in DepositTableRow */}
        <th className="col-12 col-sm-11 col-md-3" scope="col">Dataset</th>
        <th className="col-12 col-sm-11 col-md-2" scope="col">Date</th>
        <th className="col-12 col-sm-11 col-md-2" scope="col">State</th>
        <th className="col-12 col-sm-11 col-md-4" scope="col">Notes</th>
        <th className="col-12 col-sm-1  col-md-1" scope="col" id="actions_cell"/>
    </tr>
    </thead>
)

export default DepositTableHead
