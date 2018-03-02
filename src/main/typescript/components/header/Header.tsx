import * as React from "react"
import { ImgHTMLAttributes, SFC } from "react"
import { Link, NavLink, NavLinkProps } from "react-router-dom"

const logo_dans = require("../../../resources/img/header/logo_dans.png")
const logo_easy = require("../../../resources/img/header/logo_easy.png")

const BrandLogo = ({ className, id, src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => (
    <div className={className} id={id}>
        <Link to="/">
            <img {...rest} src={src} alt={alt}/>
        </Link>
    </div>
)

const LogosHeaders: SFC = ({ children }) => (
    <header className="no-print container-fluid">
        <div className="row" id="header-logos">
            {children}
        </div>
    </header>
)

interface NavBarButton {
    dataTarget: string
}

const NavBarButton = ({dataTarget}: NavBarButton) => (
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

const NavBarLink = ({to, title, children, className, ...rest}: NavLinkProps) => (
    <NavLink {...rest}
             className={`nav-link ${className || ""}`}
             activeClassName="active"
             to={to}
             title={title}>{children}</NavLink>
)

const NavBar: SFC = ({children}) => (
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

const Header2 = () => (
    <>
        <NavBar>
            <NavBarLink to="/" title="Home">Home</NavBarLink>
            <NavBarLink to="/register" title="Register to get access to EASY">Register</NavBarLink>
            <NavBarLink to="/login" title="Login to EASY">Login</NavBarLink>
            <span className="nav-link navbar-text">[displayName]</span>
            <NavBarLink to="/deposit-overview">My Datasets</NavBarLink>
            <NavBarLink to="#" className="logoff" title="Log out">Log out</NavBarLink>
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
    </>
)

export default Header2
