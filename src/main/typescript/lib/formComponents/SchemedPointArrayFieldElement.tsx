import * as React from "react"
import SelectField from "./SelectField"
import LabeledTextField from "./LabeledTextField"
import {Field} from "redux-form"
import RemoveButton from "./RemoveButton"
import { SchemedPointFieldArrayProps } from "./SchemedPointArrayField"

interface SchemedPointArrayFieldElementProps {
    name: string[]
    onDelete: () => void
    deleteDisabled: boolean
}

const SchemedPointArrayFieldElement = ({name, onDelete, deleteDisabled, schemeValues}: SchemedPointArrayFieldElementProps & SchemedPointFieldArrayProps) => (
    <div className="form-row">
        <div className="col">
            <Field name={name[0]}
                   label="Scheme"
                   choices={schemeValues}
                   withEmptyDefault
                   component={SelectField}/>
        </div>
        <div className="col input-group mb-2">
            <Field name={name[1]}
                   label="X"
                   placeholder="coordinate"
                   type="number"
                   component={LabeledTextField}/>
        </div>
        <div className="col">
            <div className="input-group mb-2 mr-2">
                <Field name={name[2]}
                       label="Y"
                       placeholder="coordinate"
                       type="number"
                       component={LabeledTextField}/>
                <RemoveButton onClick={onDelete}
                              disabled={deleteDisabled}/>
            </div>
        </div>
    </div>
)

export default SchemedPointArrayFieldElement
