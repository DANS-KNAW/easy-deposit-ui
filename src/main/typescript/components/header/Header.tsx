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
import * as React from 'react'
import {Link, NavLink, NavLinkProps} from "react-router-dom"

const logo_dans = require("../../../resources/img/header/logo_dans.png")
const logo_easy = require("../../../resources/img/header/logo_easy.png")

// Logo of EASY
const BrandLogo = () => (
    <Link className="navbar-brand" to="/">
        <img src={logo_dans} width="100" /*height="30"*/ alt="DANS logo"/>
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
