import * as React from "react"
import { Component } from "react"
import { Link } from "react-router-dom"

const logo_dans = require("../../../resources/img/header/logo_dans.png")
const logo_easy = require("../../../resources/img/header/logo_easy.png")

interface Header2Props {

}

interface Header2State {

}

class Header2 extends Component<Header2Props, Header2State> {
    constructor(props: Header2Props) {
        super(props)
    }

    render() {
        return (
            <>
                <p>here comes the nav-bar</p>

                {/*<nav className="navbar navbar-expand-lg admin-nav" role="navigation">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/">Home</Link></li>
                            <li className="nav-item"><Link to="register" title="Register to get access to EASY">Register</Link></li>
                            <li className="nav-item"><Link to="login" title="Login to EASY">Login</Link></li>
                            <li className="nav-item navbar-text">[displayName]</li>
                            <li className="nav-item"><Link to="myDatasets">My Datasets</Link></li>
                            <li className="nav-item"><Link to="myRequests" className="requests">My Requests</Link></li>
                            <li className="nav-item"><Link to="settings" className="sprite settings" title="My personal settings">My Settings</Link></li>
                            <li className="nav-item"><Link to="logout" className="logoff" title="Log out">Log out</Link></li>
                        </ul>
                    </div>
                </nav>*/}

                <header className="no-print container-fluid">
                    <div className="row" id="header-logos">
                        <div className="col-6 col-md-3 col-lg-2" id="dans-logo">
                            <Link to="/">
                                <img src={logo_dans} alt="DANS - Data Archiving and Networked Services"/>
                            </Link>
                        </div>
                        <div className="col-6 col-md-2 offset-md-2 col-lg-2 offset-lg-3" id="easy-logo">
                            <Link to="/">
                                <img src={logo_easy} height="25px" alt="EASY"/>
                            </Link>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}

export default Header2
