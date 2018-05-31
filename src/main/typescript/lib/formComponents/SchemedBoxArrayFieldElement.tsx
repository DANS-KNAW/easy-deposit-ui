import * as React from "react"
import SelectField from "./SelectField"
import LabeledTextField from "./LabeledTextField"
import {Field} from "redux-form"
import { SchemedBoxFieldArrayProps } from "./SchemedBoxArrayField"
import RemoveButton from "./RemoveButton"

interface SchemedBoxArrayFieldElementProps {
    name: string[]
    onDelete: () => void
    deleteDisabled: boolean
}

const SchemedBoxArrayFieldElement = ({ name, onDelete, deleteDisabled, schemeValues }: SchemedBoxArrayFieldElementProps & SchemedBoxFieldArrayProps) => (
    <>
        <div className="form-row">
            <div className="col input-group mb-1">
                <Field name={name[0]}
                       label="Scheme"
                       choices={schemeValues}
                       withEmptyDefault
                       component={SelectField}/>
            </div>
            <div className="col input-group mb-1">
                <Field name={name[1]}
                       label="North"
                       placeholder="upper bound"
                       type="number"
                       component={LabeledTextField}/>
            </div>
            <div className="col input-group mb-1">
                <Field name={name[2]}
                       label="East"
                       placeholder="right bound"
                       type="number"
                       component={LabeledTextField}/>
            </div>
        </div>

        <div className="form-row">
            <div className="col input-group mb-2"/>
            <div className="col input-group mb-2">
                <Field name={name[3]}
                       label="South"
                       placeholder="lower bound"
                       type="number"
                       component={LabeledTextField}/>
            </div>
            <div className="col">
                <div className="input-group mb-2 mr-2">
                    <Field name={name[4]}
                           label="West"
                           placeholder="left bound"
                           type="number"
                           component={LabeledTextField}/>
                    <RemoveButton onClick={onDelete}
                                  disabled={deleteDisabled}/>
                </div>
            </div>
        </div>
    </>
)

export default SchemedBoxArrayFieldElement
