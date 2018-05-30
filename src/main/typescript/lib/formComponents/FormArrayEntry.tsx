import * as React from "react"
import { Component } from "react"
import { FieldArrayProps } from "./RepeatableField"

interface PlusButtonProps {
    onClick: () => void
}

const PlusButton = ({onClick}: PlusButtonProps) => (
    <div className="col-12 col-md-1 mb-2 pl-0 pr-0 add-button">
        <button type="button"
                className="input-group-text bg-success text-light"
                onClick={onClick}>
            <i className="fas fa-plus-square"/>
        </button>
    </div>
)

class FormArrayEntry<T> extends Component<FieldArrayProps<T>> {
    render() {
        const { children, ...rest } = this.props
        const {fields, empty, label} = rest
        return (
            <>
                <label className={"col-12 col-md-3 pl-0 title-label multi-field-label"}>{label}</label>
                <div className="col-12 col-md-8 pl-0 pr-0 text-array">
                    {children}
                </div>
                <PlusButton onClick={() => fields.push(empty)}/>
            </>
        )
    }
}

export default FormArrayEntry
