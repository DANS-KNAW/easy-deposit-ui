import * as React from "react"
import { SFC } from "react"
import { WrappedFieldProps } from "redux-form"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import asField from "../../../../lib/formComponents/FieldHOC"
import { WrappedFieldInputProps } from "redux-form/lib/Field"
import { AppState } from "../../../../model/AppState"
import { connect } from "react-redux"
import { compose } from "redux"

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

interface AccessRightsFieldProps {
    userGroups: string[]
}

const AccessRightsField = ({ userGroups, input, meta, label }: WrappedFieldProps & AccessRightsFieldProps) => (
    <>
        <RadioButton choice={AccessRightValue.OPEN_ACCESS}
                     choiceLabel="Open Access"
                     input={input}/>

        <RadioButton choice={AccessRightValue.REQUEST_PERMISSION}
                     choiceLabel="Restricted Access"
                     input={input}/>

        {
            userGroups.length > 0 && <RadioButton choice={AccessRightValue.GROUP_ACCESS}
                                                  choiceLabel="Group Access"
                                                  input={input}>
            </RadioButton>
        }
    </>
)

const mapStateToProps = (state: AppState) => ({
    userGroups: state.user.groups,
})

export default compose(
    asField,
    connect(mapStateToProps),
)(AccessRightsField)
