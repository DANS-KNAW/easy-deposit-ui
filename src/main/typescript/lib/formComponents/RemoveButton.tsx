import * as React from "react"

interface RemoveButtonProps {
    onClick: () => void
    disabled: boolean
}

const RemoveButton = ({onClick, disabled}: RemoveButtonProps) => (
    <div className="input-group-append">
        <button type="button"
                className="input-group-text bg-danger text-light remove-button"
                onClick={onClick}
                disabled={disabled}>
            <i className="fas fa-minus-square"/>
        </button>
    </div>
)

export default RemoveButton
