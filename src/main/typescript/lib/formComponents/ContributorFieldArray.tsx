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
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"
import { Field } from "redux-form"
import TextField, { ErrorHandlingTextField } from "./TextField"
import { DropdownFieldInput } from "./DropDownField"
import { DropdownListEntry } from "../../model/DropdownLists"
import { FieldArrayProps } from "./ReduxFormUtils"
import Mandatory from "./Mandatory"
import { Contributor, DAI, ISNI, ORCID } from "../metadata/Contributor"

interface ContributorFieldProps extends InnerComponentProps, FieldArrayProps<Contributor> {
    roleValues?: DropdownListEntry[]
}

const ContributorField = ({ names, roleValues, className }: ContributorFieldProps) => (
    <div className={`border rounded contributor p-2 ${className || ""}`}>
        {roleValues && <div className="form-row">
            <div className="col form-group col-md-6 mb-1">
                <Field name={names[7]}
                       choices={roleValues || []}
                       component={DropdownFieldInput}/>
            </div>
        </div>}

        <div className="form-row">
            <div className="col form-group col-md-6 mb-1">
                <label>Organisation</label>
                <Field name={names[8]}
                       placeholder="organisation"
                       component={ErrorHandlingTextField}/>
            </div>
            {/* TODO these fields need to be added later. they do not yet occur in the UI model, nor in the API */}
            {/*<div className="col form-group col-md-3 mb-1">
                <label>Identifier</label>
                <Field name={""}
                       choices={idValues}
                       withEmptyDefault
                       emptyDefault="Choose..."
                       component={DropdownFieldInput}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label/>
                <Field name={"abc"}
                       placeholder="Identifier"
                       component={TextField}/>
            </div>*/}
        </div>

        <div className="form-row">
            <div className="col form-group col-md-3 mb-1">
                <label>(Academic) title(s)</label>
                <Field name={names[0]}
                       placeholder="(academic) title(s)"
                       component={TextField}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label>Initials<Mandatory/></label>
                <Field name={names[1]}
                       placeholder="initials"
                       component={ErrorHandlingTextField}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label>Prefix</label>
                <Field name={names[2]}
                       placeholder="prefix"
                       component={TextField}/>
            </div>
            <div className="col form-group col-md-3 mb-1">
                <label>Surname<Mandatory/></label>
                <Field name={names[3]}
                       placeholder="surname"
                       component={ErrorHandlingTextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col form-group col-md-6 mb-1">
                <label>ORCID</label>
                <Field name={names[4]}
                       placeholder={ORCID.placeholder}
                       component={ErrorHandlingTextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col form-group col-md-6 mb-1">
                <label>ISNI</label>
                <Field name={names[5]}
                       placeholder={ISNI.placeholder}
                       component={ErrorHandlingTextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col form-group col-md-6 mb-1">
                <label>DAI</label>
                <Field name={names[6]}
                       placeholder={DAI.placeholder}
                       component={ErrorHandlingTextField}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(ContributorField)
