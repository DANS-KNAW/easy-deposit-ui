import * as React from "react"
import { SFC } from "react"

export const Alert: SFC = ({children}) => <div className="alert alert-danger" role="alert">{children}</div>

interface ReloadAlertProps {
    reload: () => any
}

export const ReloadAlert: SFC<ReloadAlertProps> = ({ reload, children }) => (
    <div className="alert alert-danger alert-dismissible" role="alert">
        {children}
        <button type="button" className="close icon" onClick={reload}>
            <i className="fas fa-sync-alt"/>
        </button>
    </div>
)

export const CloseableWarning: SFC = ({children}) => (
    <div className="alert alert-warning alert-dismissible fade show"
         role="alert">
        {children}
        <button type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
)
