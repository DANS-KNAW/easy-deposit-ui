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
import { buildDate, inDevelopmentMode, projectVersion } from "../lib/config"
import "../../resources/css/footer"
import { getApiUrl } from "../selectors/configuration"
import { useSelector } from "../lib/redux"

const cts = require("../../resources/img/footer/logo_CTS.png")
const knaw = require("../../resources/img/footer/logo_KNAW.png")
const nestor = require("../../resources/img/footer/logo_NESTOR.png")
const nwo = require("../../resources/img/footer/logo_NWO.png")

const ContactColumn = () => (
    <ul className="contact">
        <li>
            <a href="tel:+31-703494450">+31 70 349 44 50</a>
        </li>
        <li>
            <a href="mailto:info@dans.knaw.nl">info@dans.knaw.nl</a>
        </li>
        <li>
            <a title="View how to contact" href="https://dans.knaw.nl/en/contact" target="_blank">More ›››</a>
        </li>

    </ul>
)

interface SocialMediaProps {
    href: string
    iconClass: string
    name: string
}

const SocialMedia = ({ href, iconClass, name }: SocialMediaProps) => (
    <li>
        <a href={href} target="_blank">
            <i className={iconClass} aria-hidden="true"/> {name}
        </a>
    </li>
)

const SocialColumn = () => (
    <ul className="social">
        <SocialMedia href="http://dans.knaw.nl/en/@@dans_mailchimp_subscribe"
                     iconClass="fas fa-envelope-square"
                     name="Newsletter"/>
        <SocialMedia href="https://twitter.com/DANSKNAW"
                     iconClass="fab fa-twitter-square"
                     name="Twitter"/>
        <SocialMedia href="https://www.youtube.com/user/DANSDataArchiving"
                     iconClass="fab fa-youtube-square"
                     name="YouTube"/>
        <SocialMedia href="https://www.linkedin.com/company/dans"
                     iconClass="fab fa-linkedin"
                     name="LinkedIn"/>
    </ul>
)

const Link = ({ children, title, href }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <li>
        <a title={title}
           href={href}
           target="_blank">{children}</a>
    </li>
)

const LinksColumn = () => (
    <ul className="links">
        <Link title="View the disclaimer"
              href="https://dans.knaw.nl/en/about/services/data-archiving-and-reuse/easy/disclaimer-easy">
            Disclaimer
        </Link>
        <Link title="View the legal information"
              href="https://dans.knaw.nl/en/about/organisation-and-policy/legal-information">
            Legal information
        </Link>
        <Link title="View the Privacy Statement"
              href="https://dans.knaw.nl/en/about/organisation-and-policy/legal-information/privacy-statement">
            Privacy statement
        </Link>
        <Link title="View the property rights statement"
              href="https://dans.knaw.nl/en/about/organisation-and-policy/legal-information/property-rights-statement">
            Property rights statement
        </Link>
        <Link title="How to cite data"
              href="https://dans.knaw.nl/en/search/about-reusing-data">
            How to cite data
        </Link>
    </ul>
)

const CertificationColumn = () => (
    <div className="easy-Certificering-link">
        <a href="https://dans.knaw.nl/en/about/organisation-and-policy/certification"
           target="_blank"
           title="Certification">
            <img src={cts}/>
            <img src={nestor}/>
        </a>
    </div>
)

const AboutDansColumn = () => (
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
)

const TitleRow = () => (
    <div className="row">
        <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <div className="h1">Contact</div>
        </div>
    </div>
)

const ContentRow = () => (
    <div className="row">
        <div className="col-7 col-sm-4 col-md-3 col-lg-2">
            <ContactColumn/>
        </div>

        <div className="col-5 col-sm-3 col-md-2 offset-md-2 col-lg-2 offset-lg-0">
            <SocialColumn/>
        </div>

        <div className="col-12 col-sm-4 offset-sm-1 col-md-3 offset-md-2 col-lg-2 offset-lg-0">
            <LinksColumn/>
        </div>

        <div className="col-12 col-sm-4 col-md-4 col-lg-3">
            <CertificationColumn/>
        </div>

        <div className="col-sm-8 col-lg-3">
            <AboutDansColumn/>
        </div>
    </div>
)

interface FooterBuildInfoProps {
    apiUrl: string
}

const BuildInfoRow = ({ apiUrl }: FooterBuildInfoProps) => (
    <div className="row">
        <div className="col-12">
            <div className="version">
                <div>Version: <span>{projectVersion}</span></div>
                <div>Build date: <span>{buildDate}</span></div>
                {inDevelopmentMode && <div>API base url: <span>{apiUrl}</span></div>}
            </div>
        </div>
    </div>
)

const Footer = () => (
    <footer className="container-fluid">
        <TitleRow/>
        <ContentRow/>
        <BuildInfoRow apiUrl={useSelector(getApiUrl)}/>
    </footer>
)

export default Footer
