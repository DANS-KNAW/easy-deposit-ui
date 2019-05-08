import * as React from "react"
import { FC, useEffect } from "react"
import { connect } from "react-redux"
import { cookieAuthenticate } from "./actions/authenticationActions"
import { AppState } from "./model/AppState"
import { ComplexThunkAction } from "./lib/redux"

interface CookieAuthProps {
    isAuthenticated: boolean

    cookieAuthenticate: () => ComplexThunkAction
}

const CookieAuth: FC<CookieAuthProps> = ({ isAuthenticated, cookieAuthenticate, children }) => {
    useEffect(() => {
        if (!isAuthenticated)
            cookieAuthenticate()
    }, [])

    return (<>{children}</>)
}

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.authenticatedUser.isAuthenticated,
})

export default connect(mapStateToProps, { cookieAuthenticate })(CookieAuth)
