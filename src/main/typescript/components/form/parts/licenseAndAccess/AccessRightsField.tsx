import * as React from "react"
import { SFC } from "react"
import { WrappedFieldProps } from "redux-form"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import asField from "../../../../lib/formComponents/FieldHOC"
import { WrappedFieldInputProps } from "redux-form/lib/Field"

interface AccessRightsFieldProps {
interface RadioButtonProps {
    choice: AccessRightValue
    choiceLabel: string
    input: WrappedFieldInputProps
}

const RadioButton: SFC<RadioButtonProps> = ({ choice, choiceLabel, input, children }) => (
    <div className="form-check col-12">
        <input className="form-check-input"
               id={choice}
               type="radio"
               {...input}
               value={choice}
               defaultChecked={input.value.category === choice}/>
        <label className="form-check-label" htmlFor={choice}>{choiceLabel}</label>
        {children}
    </div>
)

}

const AccessRightsField = ({ input, meta, label }: WrappedFieldProps & AccessRightsFieldProps) => (
    <>
        <RadioButton choice={AccessRightValue.OPEN_ACCESS}
                     choiceLabel="Open Access"
                     input={input}/>

        <RadioButton choice={AccessRightValue.REQUEST_PERMISSION}
                     choiceLabel="Restricted Access"
                     input={input}/>

        <RadioButton choice={AccessRightValue.GROUP_ACCESS}
                     choiceLabel="Group Access"
                     input={input}>
            {/* TODO dropdown here */}
        </RadioButton>
    </>
)

export default asField(AccessRightsField)
