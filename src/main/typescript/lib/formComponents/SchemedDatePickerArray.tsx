import * as React from "react"
import asFieldArray, { InnerComponentProps } from "./FieldArrayHOC"
import { Field } from "redux-form"
import RemoveButton from "./RemoveButton"
import { DatePickerInput } from "./DatePickerField"
import { DropdownListEntry } from "../../model/DropdownLists"
import { DropdownFieldInput } from "./DropDownField"

interface SchemedDatePickerArrayProps extends InnerComponentProps {
    label: string
    schemeValues: DropdownListEntry[]
    withEmptyDefault?: boolean
}

const SchemedDatePickerArray = ({ names, label, onDelete, deleteDisabled, schemeValues, withEmptyDefault }: SchemedDatePickerArrayProps) => (
    <div className="form-row">
        <div className="col col-md-4">
            <Field name={names[0]}
                   label="Scheme"
                   choices={schemeValues}
                   withEmptyDefault={withEmptyDefault}
                   component={DropdownFieldInput}/>
        </div>
        <div className="col col-md-8">
            <div className="input-group mb-2 mr-2">
                {/*
                  * In contrast to other form fields, we have the '.form-control' wrapped around the Field
                  * DatePickerInput wraps a DatePicker that is not managed by us. Therefore we cannot add
                  * the '.form-control' at the appropriate location in the DOM tree.
                  * Wrapping the Field in this way, together with the '.date-picker-field' allows us to
                  * change some rules in form.css such that this field matches our overall look-and-feel.
                  */}
                <div className="form-control date-picker-field">
                    <Field name={names[1]}
                           label="Value"
                           placeholder={label}
                           component={DatePickerInput}/>
                </div>
                <RemoveButton onClick={onDelete}
                              disabled={deleteDisabled}/>
            </div>
        </div>
    </div>
)

export default asFieldArray(SchemedDatePickerArray)
