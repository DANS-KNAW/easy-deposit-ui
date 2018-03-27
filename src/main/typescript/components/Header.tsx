/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react"
import {Component, ImgHTMLAttributes, SFC} from "react"
import {Link, NavLinkProps} from "react-router-dom"
import {AppState} from "../model/AppState"
import {connect} from "react-redux"
import {Action} from "redux"
import {getUser, signout} from "../actions/userActions"
import "../../resources/css/header"
import {ReduxAction} from "../lib/redux";
import {UserDetails} from "../model/UserDetails";

const logo_dans = require("../../resources/img/header/logo_dans.png")
const logo_easy = require("../../resources/img/header/logo_easy.png")

const BrandLogo = ({ className, id, src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => (
    <div className={className} id={id}>
        <Link to="/">
            <img {...rest} src={src} alt={alt}/>
        </Link>
    </div>
)

const LogosHeaders: SFC = ({ children }) => (
    <header className="container-fluid">
        <div className="row" id="header-logos">
            {children}
        </div>
    </header>
)

interface NavBarButton {
    dataTarget: string
}

const NavBarButton = ({ dataTarget }: NavBarButton) => (
    <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target={`#${dataTarget}`}
            aria-controls={dataTarget}
            aria-expanded="false"
            aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
    </button>
)

const NavBarLink = ({ to, title, children, className, ...rest }: NavLinkProps) => (
    <Link {...rest}
          className={`nav-link ${className || ""}`}
          to={to}
          title={title}>{children}</Link>
)

const NavBar: SFC = ({ children }) => (
    <nav className="navbar navbar-expand-lg navbar-light admin-nav" role="navigation">
        <a className="navbar-brand" href="#"/> {/* this one is here to move the button to the right */}
        <NavBarButton dataTarget="navbarSupportedContent"/>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                {React.Children.map(children, (child, index) => (
                    <li key={index} className="nav-item">{child}</li>
                ))}
            </ul>
        </div>
    </nav>
)

interface HeaderProps {
    isLoggedIn: boolean
    loginName: string
    signout: () => Action
    getUser: () => ReduxAction<Promise<UserDetails>>
}

class Header extends Component<HeaderProps> {
    render() {
        const { isLoggedIn, loginName, signout, getUser } = this.props
        console.log("render: logged in: %s, username: %s => %s" , isLoggedIn, loginName, isLoggedIn && loginName == undefined);
        if(isLoggedIn && loginName == undefined){
            getUser()
        }

        const loginNavBar = isLoggedIn
            ? [
                <span key="loginName" className="navbar-text">{loginName}</span>,
                <NavBarLink key="my datasets" to="/deposit-overview">My Datasets</NavBarLink>,
                <Link onClick={signout} className="nav-link logoff" key="log out" to="/" title="Log out">Log out</Link>,
            ]
            : [<NavBarLink key="login" to="/login" title="Login to EASY">Login</NavBarLink>]

        return <>
            <NavBar>
                <NavBarLink to="/" title="Home">Home</NavBarLink>
                <NavBarLink to="/register" title="Register to get access to EASY">Register</NavBarLink>
                {...loginNavBar}
            </NavBar>

            <LogosHeaders>
                <BrandLogo className="col-6 col-md-3 col-lg-2"
                           id="dans-logo"
                           src={logo_dans}
                           alt="DANS - Data Archiving and Networked Services"/>
                <BrandLogo className="col-6 col-md-2 offset-md-2 col-lg-2 offset-lg-3"
                           id="easy-logo"
                           height="25px"
                           src={logo_easy}
                           alt="EASY"/>
            </LogosHeaders>
            {/* TODO not sure if this <hr/> will stay, but I think it is useful during development */}
            <hr/>
        </>
    }
}

const mapStateToProps = (state: AppState) => ({
    isLoggedIn: state.user.isAuthenticated,
    loginName: state.user.userName||undefined
})

export default connect(mapStateToProps, { signout, getUser })(Header)
