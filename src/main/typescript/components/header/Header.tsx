import * as React from 'react'
import {Link, NavLink, NavLinkProps} from "react-router-dom"

const logo = require("../../../resources/img/header/dans-logo.jpg")

// Logo of EASY
const BrandLogo = () => (
    <Link className="navbar-brand" to="/">
        <img src={logo} width="100" /*height="30"*/ alt="DANS logo"/>
    </Link>
)

// Hamburger button for mobile devices
const Hamburger = () => (
    <button className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
    </button>
)

// Navigation link
const NavItem = ({to, children, ...rest}: NavLinkProps) => (
    <li className="nav-item">
        <NavLink {...rest}
                 className="nav-link"
                 activeClassName="active"
                 to={to}>
            {children}
        </NavLink>
    </li>
)

const Navigation = () => (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <NavItem to="/" exact>Home</NavItem>
            <NavItem to="/abc">Link</NavItem>
        </ul>
    </div>
)

const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light">
            <BrandLogo/>
            <Hamburger/>
            <Navigation/>
        </nav>
        /* TODO not sure if we want to keep this `hr`, but it's useful for developing */
        <hr/>
    </header>
)

export default Header
