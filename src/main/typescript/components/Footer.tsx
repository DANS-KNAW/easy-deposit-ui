import * as React from 'react'

const dsa = require("../../resources/img/footer/logo-DSA.jpg")
const knaw = require("../../resources/img/footer/logo-KNAW.jpg")
const nestor = require("../../resources/img/footer/logo-NESTOR.jpg")
const nwo = require("../../resources/img/footer/logo-NWO.jpg")
const wds = require("../../resources/img/footer/logo-WDS.jpg")

const Footer = () => (
    <footer className="footer no-print container-fluid">
        <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-3 col-xs-6">
                <div className="h1">Contact</div>
                <ul className="contact">
                    <li>Anna van Saksenlaan 51</li>
                    <li>2593 HW Den Haag</li>
                    <li><a href="mailto:info@dans.knaw.nl">info@dans.knaw.nl</a></li>
                    <li><a className="external more"
                           title="View how to contact"
                           href="http://dans.knaw.nl/en/contact"
                           target="_blank">More</a></li>
                </ul>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6">
                <div className="h1">&nbsp;</div>
                <ul className="social">
                    <li>
                        <a href="http://dans.knaw.nl/en/@@dans_mailchimp_subscribe" target="_blank">
                            <i className="fas fa-envelope-square" aria-hidden="true"/> Newsletter
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://twitter.com/DANSKNAW">
                            <i className="fab fa-twitter-square" aria-hidden="true"/> Twitter
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.youtube.com/user/DANSDataArchiving">
                            <i className="fab fa-youtube" aria-hidden="true"/> YouTube
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.linkedin.com/company/dans">
                            <i className="fab fa-linkedin" aria-hidden="true"/> LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                <div className="h1">&nbsp;</div>
                <ul>
                    <li>
                        <a title="View the disclaimer"
                           href="http://dans.knaw.nl/en/about/services/data-archiving-and-reuse/easy/disclaimer-easy"
                           target="_blank">Disclaimer</a>
                    </li>
                    <li>
                        <a title="View the legal information"
                           href="http://www.dans.knaw.nl/nl/over/organisatie-beleid/juridische-informatie"
                           target="_blank">Legal information</a>
                    </li>
                    <li>
                        <a title="View the property right statement"
                           href="http://www.dans.knaw.nl/en/about/organisation-and-policy/legal-information/property-rights-statement"
                           target="_blank">Property rights statement</a>
                    </li>
                    <li>
                        <a href="http://dans.knaw.nl/en/search/about-reusing-data" target="_blank"
                           title="How to cite data">How to cite data</a>
                    </li>
                </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-sm-offset-0 col-xs-12 ">
                <div className="easy-Certificering-link">
                    <a href="http://www.dans.knaw.nl/nl/over/organisatie-beleid/Certificering"
                       target="_blank"
                       title="Certificering">
                        <img width="55px" height="55px" src={dsa}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <img width="55px" height="55px" src={nestor}/>
                        &nbsp;&nbsp;
                        <img height="55px" src={wds}/>
                    </a>
                </div>
            </div>
            <div className="col-lg-3 ">
                <div className="overdans">
                    <p>DANS is an institute of KNAW and NWO</p>
                    <p>
                        <a href="http://www.knaw.nl/en" target="_blank">
                            <img width="55px" src={knaw}/>
                        </a>
                        <a href="http://www.nwo.nl/en" target="_blank">
                            <img width="55px" src={nwo}/>
                        </a>
                    </p>
                    <p className="driven-by-data">Driven by data</p>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-12">
                <div className="version">
                    <span>
                        {/* TODO add version and build date parameters to configuration? */}
                        <div>Version: <span>2.21.1</span></div>
                        <div>Build date: <span>2017-12-14 10:05</span></div>
                    </span>
                </div>
            </div>
        </div>
    </footer>
)

export default Footer