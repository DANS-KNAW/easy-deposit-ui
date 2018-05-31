import * as React from "react"

interface AddButtonProps {
    onClick: () => void
}

const AddButton = ({ onClick }: AddButtonProps) => (
    <div className="col-12 col-md-1 mb-2 pl-0 pr-0 add-button">
        <button type="button"
                className="input-group-text bg-success text-light"
                onClick={onClick}>
            <i className="fas fa-plus-square"/>
        </button>
    </div>
)

export default AddButton
