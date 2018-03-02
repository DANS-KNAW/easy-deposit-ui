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
import {projectVersion} from "../lib/config"

const dsa = require("../../resources/img/footer/logo_DSA.png")
const knaw = require("../../resources/img/footer/logo_KNAW.png")
const nestor = require("../../resources/img/footer/logo_NESTOR.png")
const nwo = require("../../resources/img/footer/logo_NWO.png")
const wds = require("../../resources/img/footer/logo_WDS.png")

const Footer = () => (
    <footer className="no-print container-fluid">
        <div className="row">
            <div className="col-12 col-sm-12 col-md-3 col-lg-2">
                <div className="h1">Contact</div>
            </div>
        </div>
        <div className="row">
            <div className="col-6 col-sm-3 col-md-3 col-lg-2">
                <ul className="contact">
                    <li>Anna van Saksenlaan 51</li>
                    <li>2593 HW Den Haag</li>
                    <li>
                        <a href="mailto:info@dans.knaw.nl">info@dans.knaw.nl</a>
                    </li>
                    <li>
                        <a title="View how to contact"
                           href="http://dans.knaw.nl/en/contact"
                           target="_blank">More  ›››</a>
                    </li>
                </ul>
            </div>
            <div className="col-6 col-sm-3 col-md-2 col-lg-2">
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
                            <i className="fab fa-youtube-square" aria-hidden="true"/> YouTube
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.linkedin.com/company/dans">
                            <i className="fab fa-linkedin" aria-hidden="true"/> LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div className="col-12 col-sm-3 col-md-2 col-lg-2">
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
            <div className="col-12 col-sm-4 col-md-4 col-lg-3">
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
            <div className="col-lg-3">
                <div className="overdans">
                    <p>DANS is an institute of KNAW and NWO</p>
                    <p>
                        <a href="http://www.knaw.nl/en" target="_blank">
                            <img height="55px" src={knaw}/>
                        </a>
                        <a href="http://www.nwo.nl/en" target="_blank">
                            <img height="55px" src={nwo}/>
                        </a>
                    </p>
                    <p className="driven-by-data">Driven by data</p>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <div className="version">
                    <span>
                        <div>Version: <span>{projectVersion}</span></div>
                        {/* TODO add build date parameters to configuration? */}
                        <div>Build date: <span>UNKNOWN</span></div>
                    </span>
                </div>
            </div>
        </div>
    </footer>
)

export default Footer
