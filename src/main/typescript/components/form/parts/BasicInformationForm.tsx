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
import { Component } from "react"
import {
    CreatorOrContributor, emptySchemedValue,
    emptyStringValue,
    Relation,
    SchemedDate,
    SchemedValue,
    Value,
} from "../../../model/FormData"
import { Field, WrappedFieldArrayProps } from "redux-form"
import { connect } from "react-redux"
import DoiField from "../../../lib/formComponents/DoiField"
import { FieldArrayProps, RepeatableField } from "../../../lib/formComponents/RepeatableField"
import TextFieldArray from "../../../lib/formComponents/TextFieldArray"
import TextArea from "../../../lib/formComponents/TextArea"
import { AppState } from "../../../model/AppState"
import { fetchDoi } from "../../../actions/depositFormActions"
import { ReduxAction } from "../../../lib/redux"
import { DepositId } from "../../../model/Deposits"
import { FetchDoiState } from "../../../model/DepositForm"
import SchemedTextFieldArray from "../../../lib/formComponents/SchemedTextFieldArray"
import SelectFieldArray from "../../../lib/formComponents/SelectFieldArray"

export interface BasicInformationFormData {
    doi?: string
    languageOfDescription?: string
    titles?: Value[]
    alternativeTitles?: Value[]
    description?: string
    creators?: CreatorOrContributor[]
    contributors?: CreatorOrContributor[]
    dateCreated?: Date
    audiences?: Value[]
    subjects?: Value[]
    identifiers?: SchemedValue[]
    relations?: Relation[]
    languagesOfFilesIso639?: Value[]
    languagesOfFiles?: Value[]
    datesIso8601?: SchemedDate[] // TODO how are these different from the ones below?
    dates?: SchemedValue[]
    source?: string
    instructionsForReuse?: string
}

interface BasicInformationFormInputProps {
    depositId: DepositId
}

interface DoiFieldProps {
    fetchDoi: (depositId: DepositId) => ReduxAction<Promise<any>>
    fetchDoiState: FetchDoiState
}

type BasicInformationFormProps = DoiFieldProps & BasicInformationFormInputProps

const AudienceFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SelectFieldArray {...props} choices={[
        // TODO fetch from server
        // @formatter:off
        { key: "",                    value: "Choose..." },
        { key: "easy-discipline:1",   value: "Humanities" },
        { key: "easy-discipline:2",   value: "--- Archaeology" },
        { key: "easy-discipline:3",   value: "--- Arts and culture" },
        { key: "easy-discipline:4",   value: "------ Dramaturgy" },
        { key: "easy-discipline:5",   value: "------ History of arts and architecture" },
        { key: "easy-discipline:6",   value: "------ Media sciences" },
        { key: "easy-discipline:7",   value: "------ Musicology" },
        { key: "easy-discipline:215", value: "------ Architecture and building construction" },
        { key: "easy-discipline:217", value: "--- Area Studies" },
        { key: "easy-discipline:8",   value: "--- History" },
        { key: "easy-discipline:9",   value: "------ Antiquity" },
        { key: "easy-discipline:10",  value: "------ Middle Ages" },
        { key: "easy-discipline:11",  value: "------ Modern and contemporary history" },
        { key: "easy-discipline:14",  value: "--- Language and literature studies" },
        { key: "easy-discipline:216", value: "------ Linguistics" },
        { key: "easy-discipline:15",  value: "------ Baltic and Slavonic language and literature studies" },
        { key: "easy-discipline:16",  value: "------ Classic studies" },
        { key: "easy-discipline:17",  value: "------ Germanic language and literature studies" },
        { key: "easy-discipline:18",  value: "------ Romance language and literature studies" },
        { key: "easy-discipline:19",  value: "------ Language and literature studies of other language groups" },
        { key: "easy-discipline:20",  value: "--- Paleography, bibliology, bibliography,  library science" },
        { key: "easy-discipline:21",  value: "--- Philosophy" },
        { key: "easy-discipline:210", value: "------ History and philosophy of science and technology" },
        { key: "easy-discipline:211", value: "------ History and philosphy of the life sciences, ethics, evolution biology" },
        { key: "easy-discipline:212", value: "------ History and philosophy of the humanities" },
        { key: "easy-discipline:213", value: "------ History and philosophy of the behavioural sciences" },
        { key: "easy-discipline:214", value: "------ History and philosophy of the social sciences" },
        { key: "easy-discipline:22",  value: "--- Theology and religious studies" },
        { key: "easy-discipline:23",  value: "Law and public administration " },
        { key: "easy-discipline:26",  value: "--- Political and administrative sciences" },
        { key: "easy-discipline:27",  value: "------ Political science" },
        { key: "easy-discipline:218", value: "--------- Defence" },
        { key: "easy-discipline:28",  value: "------ Social and public administration" },
        { key: "easy-discipline:29",  value: "--- Science of law" },
        { key: "easy-discipline:30",  value: "------ History of law" },
        { key: "easy-discipline:31",  value: "------ Private (procedural) law" },
        { key: "easy-discipline:32",  value: "------ Criminal (procedural) law and criminology" },
        { key: "easy-discipline:33",  value: "------ Constitutional and administrative law" },
        { key: "easy-discipline:34",  value: "------ Interdisciplinary branches of law" },
        { key: "easy-discipline:35",  value: "------ International law" },
        { key: "easy-discipline:36",  value: "--- Traffic and transport studies" },
        { key: "easy-discipline:37",  value: "Behavioural and educational sciences" },
        { key: "easy-discipline:38",  value: "--- Gerontology" },
        { key: "easy-discipline:39",  value: "--- Pedagogics" },
        { key: "easy-discipline:40",  value: "--- Psychology" },
        { key: "easy-discipline:41",  value: "--- Educational theory" },
        { key: "easy-discipline:42",  value: "Social sciences" },
        { key: "easy-discipline:43",  value: "--- Communication sciences" },
        { key: "easy-discipline:44",  value: "--- Cultural anthropology" },
        { key: "easy-discipline:45",  value: "--- Demography" },
        { key: "easy-discipline:47",  value: "--- Leisure and recreation studies" },
        { key: "easy-discipline:49",  value: "--- Social geography" },
        { key: "easy-discipline:50",  value: "--- Social security studies" },
        { key: "easy-discipline:51",  value: "--- Sociology" },
        { key: "easy-discipline:52",  value: "--- Urban and rural planning" },
        { key: "easy-discipline:53",  value: "--- Gender studies" },
        { key: "easy-discipline:54",  value: "Life sciences, medicine and health care " },
        { key: "easy-discipline:147", value: "--- Life sciences" },
        { key: "easy-discipline:148", value: "------ Bioinformatics, biomathematics" },
        { key: "easy-discipline:149", value: "------ Biophysics, clinical physics" },
        { key: "easy-discipline:150", value: "------ Biochemistry" },
        { key: "easy-discipline:151", value: "------ Genetics" },
        { key: "easy-discipline:152", value: "------ Histology, cell biology" },
        { key: "easy-discipline:153", value: "------ Anatomy, morphology" },
        { key: "easy-discipline:154", value: "------ Physiology" },
        { key: "easy-discipline:155", value: "------ Immunology, serology" },
        { key: "easy-discipline:156", value: "------ Epidemiology and medical statistics" },
        { key: "easy-discipline:157", value: "--- Biology" },
        { key: "easy-discipline:158", value: "------ Microbiology" },
        { key: "easy-discipline:159", value: "------ Biogeography, taxonomy" },
        { key: "easy-discipline:160", value: "------ Animal ethology, animal psychology" },
        { key: "easy-discipline:161", value: "------ Ecology" },
        { key: "easy-discipline:162", value: "------ Botany" },
        { key: "easy-discipline:163", value: "------ Zoology" },
        { key: "easy-discipline:164", value: "------ Toxicology (plants, invertebrates)" },
        { key: "easy-discipline:165", value: "--- Medicine" },
        { key: "easy-discipline:166", value: "------ Pathology, pathological anatomy" },
        { key: "easy-discipline:167", value: "--------- Infections, parasitology, virology" },
        { key: "easy-discipline:168", value: "--------- Oncology" },
        { key: "easy-discipline:169", value: "--------- Allergology" },
        { key: "easy-discipline:170", value: "--------- Traumatology" },
        { key: "easy-discipline:171", value: "------ Organs and organ systems " },
        { key: "easy-discipline:172", value: "--------- Dermatology, venereology, rheumatology, orthopaedics" },
        { key: "easy-discipline:173", value: "------------ Dermatology" },
        { key: "easy-discipline:174", value: "------------ Venereology" },
        { key: "easy-discipline:175", value: "------------ Rheumatology" },
        { key: "easy-discipline:176", value: "------------ Orthopaedics" },
        { key: "easy-discipline:177", value: "--------- Internal medicine" },
        { key: "easy-discipline:178", value: "------------ Blood and lymphatic diseases" },
        { key: "easy-discipline:179", value: "------------ Cardiovascular disorders" },
        { key: "easy-discipline:180", value: "------------ Gastrointestinal system" },
        { key: "easy-discipline:181", value: "------------ Gynaecology and obstetrics" },
        { key: "easy-discipline:182", value: "------------ Pulmonary disorders" },
        { key: "easy-discipline:183", value: "------------ Nephrology" },
        { key: "easy-discipline:184", value: "------------ Urology" },
        { key: "easy-discipline:185", value: "--------- Neurology, otorhinolaryngology, opthalmology" },
        { key: "easy-discipline:186", value: "------------ Neurology" },
        { key: "easy-discipline:187", value: "------------ Otorhinolaryngology" },
        { key: "easy-discipline:188", value: "------------ Ophthalmology" },
        { key: "easy-discipline:189", value: "--------- Dentistry" },
        { key: "easy-discipline:190", value: "------ Medical specialisms" },
        { key: "easy-discipline:191", value: "--------- Surgery" },
        { key: "easy-discipline:192", value: "--------- Anesthesiology" },
        { key: "easy-discipline:193", value: "--------- Radiology, radiotherapy" },
        { key: "easy-discipline:194", value: "--------- Biopharmacology, toxicology" },
        { key: "easy-discipline:195", value: "--------- Psychiatry, clinical psychology" },
        { key: "easy-discipline:196", value: "--------- Age-related medical specialisms" },
        { key: "easy-discipline:197", value: "------------ Neonatology" },
        { key: "easy-discipline:198", value: "------------ Pediatrics" },
        { key: "easy-discipline:199", value: "------------ Geriatrics" },
        { key: "easy-discipline:200", value: "--------- Social medicine" },
        { key: "easy-discipline:201", value: "--------- Primary care (including General practice)" },
        { key: "easy-discipline:202", value: "--------- Occupational medicine" },
        { key: "easy-discipline:55",  value: "--- Health sciences" },
        { key: "easy-discipline:203", value: "------ Nursing sciences" },
        { key: "easy-discipline:204", value: "------ Health education, prevention" },
        { key: "easy-discipline:205", value: "------ Nutrition" },
        { key: "easy-discipline:206", value: "--- Kinesiology" },
        { key: "easy-discipline:207", value: "------ Rehabilitation" },
        { key: "easy-discipline:208", value: "--- Veterinary medicine" },
        { key: "easy-discipline:209", value: "------ Digital humanities" },
        { key: "easy-discipline:24",  value: "Economics and Business Administration" },
        { key: "easy-discipline:48",  value: "--- Personnel administration and management" },
        { key: "easy-discipline:57",  value: "Science and technology" },
        { key: "easy-discipline:58",  value: "--- Mathematics" },
        { key: "easy-discipline:59",  value: "------ Logic, set theory and arithmetic" },
        { key: "easy-discipline:60",  value: "------ Algebra, group theory" },
        { key: "easy-discipline:61",  value: "------ Functions, differential equations" },
        { key: "easy-discipline:62",  value: "------ Fourier analysis, functional analysis" },
        { key: "easy-discipline:63",  value: "------ Geometry, topology" },
        { key: "easy-discipline:64",  value: "------ Probability theory, statistics" },
        { key: "easy-discipline:65",  value: "------ Operations research" },
        { key: "easy-discipline:66",  value: "------ Numerical analysis" },
        { key: "easy-discipline:67",  value: "--- Physics" },
        { key: "easy-discipline:68",  value: "------ Metrology, scientific instrumentation" },
        { key: "easy-discipline:69",  value: "------ Theoretical physics, (quantum) mechanics" },
        { key: "easy-discipline:70",  value: "------ Electromagnetism, optics, acoustics" },
        { key: "easy-discipline:71",  value: "------ Elementary particle physics and nuclear physics" },
        { key: "easy-discipline:72",  value: "------ Atomic and molecular physics" },
        { key: "easy-discipline:73",  value: "------ Gases, fluid dynamics, plasma physics" },
        { key: "easy-discipline:74",  value: "------ Solid-state physics" },
        { key: "easy-discipline:75",  value: "--- Chemistry" },
        { key: "easy-discipline:76",  value: "------ Analytical chemistry" },
        { key: "easy-discipline:77",  value: "------ Macromolecular chemistry, polymer chemistry" },
        { key: "easy-discipline:78",  value: "------ Organic chemistry" },
        { key: "easy-discipline:79",  value: "------ Inorganic chemistry" },
        { key: "easy-discipline:80",  value: "------ Physical chemistry" },
        { key: "easy-discipline:81",  value: "------ Catalysis" },
        { key: "easy-discipline:82",  value: "------ Theoretical chemistry, quantum chemistry" },
        { key: "easy-discipline:83",  value: "--- Technology" },
        { key: "easy-discipline:84",  value: "------ Materials technology" },
        { key: "easy-discipline:85",  value: "------ Mechanical engineering" },
        { key: "easy-discipline:86",  value: "--------- Technical mechanics" },
        { key: "easy-discipline:87",  value: "--------- Engines, energy converters" },
        { key: "easy-discipline:88",  value: "--------- Vehicle and transport technology" },
        { key: "easy-discipline:89",  value: "------------ Road vehicles, rail vehicles" },
        { key: "easy-discipline:90",  value: "------------ Vessels" },
        { key: "easy-discipline:91",  value: "------------ Aircraft and spacecraft" },
        { key: "easy-discipline:92",  value: "--------- Manufacturing technology, mechanical technology, robotics" },
        { key: "easy-discipline:93",  value: "------ Electrical engineering" },
        { key: "easy-discipline:94",  value: "--------- Telecommunication engineering" },
        { key: "easy-discipline:95",  value: "--------- Microelectronics" },
        { key: "easy-discipline:96",  value: "--------- Electrical energy technology" },
        { key: "easy-discipline:97",  value: "--------- Measurement and control engineering" },
        { key: "easy-discipline:98",  value: "------ Civil engineering, building technology" },
        { key: "easy-discipline:99",  value: "--------- Building technology" },
        { key: "easy-discipline:100", value: "--------- Civil engineering" },
        { key: "easy-discipline:101", value: "--------- Hydraulic engineering" },
        { key: "easy-discipline:102", value: "------------ Offshore technology" },
        { key: "easy-discipline:103", value: "--------- Sanitary engineering" },
        { key: "easy-discipline:104", value: "------------ Drinking water supply" },
        { key: "easy-discipline:105", value: "------------ Waste water treatment" },
        { key: "easy-discipline:106", value: "------------ Waste treatment" },
        { key: "easy-discipline:107", value: "------ Chemical technology, process technology" },
        { key: "easy-discipline:108", value: "--------- Inorganic-chemical technology" },
        { key: "easy-discipline:109", value: "--------- Organic-chemical technology" },
        { key: "easy-discipline:110", value: "--------- Fuel technology" },
        { key: "easy-discipline:111", value: "--------- Food technology" },
        { key: "easy-discipline:112", value: "------ Geotechnics" },
        { key: "easy-discipline:113", value: "--------- Mining engineering" },
        { key: "easy-discipline:114", value: "--------- Engineering geology" },
        { key: "easy-discipline:115", value: "------ Industrial design" },
        { key: "easy-discipline:116", value: "------ Energy" },
        { key: "easy-discipline:117", value: "------ Technology assessment" },
        { key: "easy-discipline:118", value: "--- Earth sciences" },
        { key: "easy-discipline:119", value: "------ Geochemistry, geophysics" },
        { key: "easy-discipline:120", value: "------ Paleontology, stratigraphy" },
        { key: "easy-discipline:121", value: "------ Physical geology" },
        { key: "easy-discipline:122", value: "------ Petrology, mineralogy, sedimentology" },
        { key: "easy-discipline:123", value: "------ Atmospheric sciences" },
        { key: "easy-discipline:124", value: "------ Hydrospheric sciences" },
        { key: "easy-discipline:56",  value: "------ Geodesy, physical geography" },
        { key: "easy-discipline:125", value: "--- Computer science" },
        { key: "easy-discipline:126", value: "------ Computer systems, architectures, networks" },
        { key: "easy-discipline:127", value: "------ Software, algorithms, control systems" },
        { key: "easy-discipline:128", value: "------ Theoretical computer science" },
        { key: "easy-discipline:129", value: "------ Information systems, databases" },
        { key: "easy-discipline:130", value: "------ User interfaces, multimedia" },
        { key: "easy-discipline:131", value: "------ Artificial intelligence, expert systems" },
        { key: "easy-discipline:132", value: "------ Computer graphics" },
        { key: "easy-discipline:133", value: "------ Computer simulation, virtual reality" },
        { key: "easy-discipline:134", value: "--- Astronomy, astrophysics" },
        { key: "easy-discipline:135", value: "--- Agriculture and the physical environment" },
        { key: "easy-discipline:136", value: "------ Exploitation and management  physical environment" },
        { key: "easy-discipline:137", value: "--------- Air" },
        { key: "easy-discipline:138", value: "--------- Surfacewater and groundwater" },
        { key: "easy-discipline:139", value: "--------- Soil" },
        { key: "easy-discipline:140", value: "--------- Nature and landscape" },
        { key: "easy-discipline:141", value: "------ Plant production and animal production" },
        { key: "easy-discipline:142", value: "--------- Agriculture and horticulture" },
        { key: "easy-discipline:143", value: "--------- Animal husbandry" },
        { key: "easy-discipline:144", value: "--------- Fisheries" },
        { key: "easy-discipline:145", value: "--------- Forestry" },
        { key: "easy-discipline:146", value: "--------- Agriculturural technology" },
        { key: "easy-discipline:219", value: "Interdisciplinary sciences" },
        { key: "easy-discipline:220", value: "--- Biotechnology" },
        { key: "easy-discipline:221", value: "--- Technology in medicine and health care" },
        { key: "easy-discipline:46",  value: "--- Development studies" },
        { key: "easy-discipline:222", value: "--- Migration, ethnic relations and multiculturalism" },
        { key: "easy-discipline:25",  value: "--- Environmental studies" },
        { key: "easy-discipline:223", value: "--- Nanotechnology" },
        { key: "easy-discipline:224", value: "--- Greenhouse gas mitigation" },
        { key: "easy-discipline:225", value: "--- Biobased economy" },
        // @formatter:on
    ]}/>
)

const IdentifierFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} schemeValues={[
        // @formatter:off
        { key: "DOI",                       value: "DOI" },
        { key: "URN",                       value: "URN" },
        { key: "MENDELEY-DATA",             value: "Mendeley data" },
        { key: "ISBN",                      value: "ISBN" },
        { key: "ISSN",                      value: "ISSN" },
        { key: "NWO-PROJECTNR",             value: "NWO project no." },
        { key: "ARCHIS-ZAAK-IDENTIFICATIE", value: "Archis zaak identificatie" },
        { key: "eDNA-project",              value: "eDNA project" },
        // TODO add others
        // @formatter:on
    ]}/>
)

const DateFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} schemeValues={[
        // @formatter:off
        { key: "Valid",            value: "Valid" },
        { key: "Issued",           value: "Issued" },
        { key: "Modified",         value: "Modified" },
        { key: "Date accepted",    value: "Date accepted" },
        { key: "Date copyrighted", value: "Date copyrighted" },
        // TODO add others
        // @formatter:on
    ]}/>
)

class BasicInformationForm extends Component<BasicInformationFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row form-group input-element">
                    <Field name="doi"
                           label="Digital Object Identifier"
                           fetchDoi={() => this.props.fetchDoi(this.props.depositId)}
                           fetchDoiState={this.props.fetchDoiState}
                           component={DoiField}/>
                </div>

                <div className="row form-group input-element">
                    <p>Language of description</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="titles"
                                     label="Title"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="alternativeTitles"
                                     label="Alternative title"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <Field name="description"
                           rows={5}
                           label="Description"
                           className="col-12 col-md-8"
                           withLabel
                           component={TextArea}/>
                </div>

                <div className="row form-group input-element">
                    <p>Creator</p>
                </div>

                <div className="row form-group input-element">
                    <p>Contributor</p>
                </div>

                <div className="row form-group input-element">
                    <p>Date created</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="audiences"
                                     label="Audience"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={AudienceFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="subjects"
                                     label="Subject"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="identifiers"
                                     label="Identifier"
                                     empty={emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.value`,
                                     ]}
                                     component={IdentifierFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Relation</p>
                </div>

                <div className="row form-group input-element">
                    <p>Language of files (ISO 639)</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="languagesOfFiles"
                                     label="Language of files"
                                     empty={emptyStringValue}
                                     fieldNames={[(name: string) => `${name}.value`]}
                                     component={TextFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Date (ISO 8601)</p>
                </div>

                <div className="row form-group input-element">
                    <RepeatableField name="dates"
                                     label="Date"
                                     empty={emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.value`,
                                     ]}
                                     component={DateFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <Field name="source"
                           rows={5}
                           label="Source"
                           className="col-12 col-md-8"
                           withLabel
                           component={TextArea}/>
                </div>

                <div className="row form-group input-element">
                    <Field name="instructionsForReuse"
                           rows={5}
                           label="Instructions for reuse"
                           className="col-12 col-md-8"
                           withLabel
                           component={TextArea}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    fetchDoiState: state.depositForm.fetchDoi,
})

export default connect(mapStateToProps, { fetchDoi })(BasicInformationForm)
