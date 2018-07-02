import * as React from "react"
import { WrappedFieldProps } from "redux-form"
import { AccessRightValue } from "../../../../lib/metadata/AccessRight"
import asField from "../../../../lib/formComponents/FieldHOC"

interface AccessRightsFieldProps {

}

const AccessRightsField = ({ input, meta, label }: WrappedFieldProps & AccessRightsFieldProps) => (
    <>
        <div className="form-check col-12">
            <input className="form-check-input"
                   id={AccessRightValue.OPEN_ACCESS}
                   type="radio"
                   {...input}
                   value={AccessRightValue.OPEN_ACCESS}
                   defaultChecked={input.value.category === AccessRightValue.OPEN_ACCESS}/>
            <label className="form-check-label" htmlFor={AccessRightValue.OPEN_ACCESS}>Open access</label>
        </div>

        <div className="form-check col-12">
            <input className="form-check-input"
                   id={AccessRightValue.GROUP_ACCESS}
                   type="radio"
                   {...input}
                   value={AccessRightValue.GROUP_ACCESS}
                   defaultChecked={input.value.category === AccessRightValue.GROUP_ACCESS}/>
            <label className="form-check-label" htmlFor={AccessRightValue.GROUP_ACCESS}>Group access</label>
        </div>

        <div className="form-check col-12">
            <input className="form-check-input"
                   id={AccessRightValue.REQUEST_PERMISSION}
                   type="radio"
                   {...input}
                   value={AccessRightValue.REQUEST_PERMISSION}
                   defaultChecked={input.value.category === AccessRightValue.REQUEST_PERMISSION}/>
            <label className="form-check-label" htmlFor={AccessRightValue.REQUEST_PERMISSION}>Restricted: request
                permission</label>
        </div>
    </>
)

export default asField(AccessRightsField)
