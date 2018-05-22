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
import { Field } from "redux-form"
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
import { Doi } from "../../../../../test/typescript/mockserver/metadata"
import {
    emptySchemedValue,
    emptyStringValue,
    QualifiedSchemedValue,
    SchemedValue,
    Value,
} from "../../../lib/metadata/Value"
import { Creator } from "../../../lib/metadata/Creator"
import { QualifiedDate } from "../../../lib/metadata/Date"
import { Relation } from "../../../lib/metadata/Relation"

export interface BasicInformationFormData {
    doi?: Doi
    languageOfDescription?: string
    titles?: Value[]
    alternativeTitles?: Value[]
    description?: string
    creators?: Creator[]
    contributors?: Creator[]
    dateCreated?: Date
    audiences?: Value[]
    subjects?: Value[]
    alternativeIdentifiers?: SchemedValue[]
    relatedIdentifiers?: QualifiedSchemedValue[]
    relations?: Relation[]
    languagesOfFilesIso639?: Value[]
    languagesOfFiles?: Value[]
    datesIso8601?: QualifiedDate<Date>[]
    dates?: QualifiedDate<string>[]
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
        // TODO this list is incorrect
        // @formatter:off
        { key: "",       value: "Choose..." },
        { key: "D30000", value: "Humanities" },
        { key: "D37000", value: "--- Archaeology" },
        { key: "D35000", value: "--- Arts and culture" },
        { key: "D35300", value: "------ Dramaturgy" },
        { key: "D35100", value: "------ History of arts and architecture" },
        { key: "D35400", value: "------ Media sciences" },
        { key: "D35200", value: "------ Musicology" },
        { key: "D35500", value: "------ Architecture and building construction" },
        { key: "D38000", value: "--- Area Studies" },
        { key: "D34000", value: "--- History" },
        { key: "D34100", value: "------ Antiquity" },
        { key: "D34200", value: "------ Middle Ages" },
        { key: "D34300", value: "------ Modern and contemporary history" },
        { key: "D36000", value: "--- Language and literature studies" },
        { key: "D36100", value: "------ Linguistics" },
        { key: "D36500", value: "------ Baltic and Slavonic language and literature studies" },
        { key: "D36200", value: "------ Classic studies" },
        { key: "D36300", value: "------ Germanic language and literature studies" },
        { key: "D36400", value: "------ Romance language and literature studies" },
        { key: "D36900", value: "------ Language and literature studies of other language groups" },
        { key: "D31000", value: "--- Paleography, bibliology, bibliography, library science" },
        { key: "D32000", value: "--- Philosophy" },
        { key: "D32100", value: "------ History and philosophy of science and technology" },
        { key: "D32200", value: "------ History and philosphy of the life sciences, ethics, evolution biology" },
        { key: "D32300", value: "------ History and philosophy of the humanities" },
        { key: "D32400", value: "------ History and philosophy of the behavioural sciences" },
        { key: "D32500", value: "------ History and philosophy of the social sciences" },
        { key: "D33000", value: "--- Theology and religious studies" },
        { key: "D40000", value: "Law and public administration " },
        { key: "D42000", value: "--- Political and administrative sciences" },
        { key: "D42100", value: "------ Political science" },
        { key: "D42110", value: "--------- Defence" },
        { key: "D42200", value: "------ Social and public administration" },
        { key: "D41000", value: "--- Science of law" },
        { key: "D41100", value: "------ History of law" },
        { key: "D41200", value: "------ Private (procedural) law" },
        { key: "D41300", value: "------ Criminal (procedural) law and criminology" },
        { key: "D41400", value: "------ Constitutional and administrative law" },
        { key: "D41500", value: "------ Interdisciplinary branches of law" },
        { key: "D41600", value: "------ International law" },
        { key: "D44000", value: "--- Traffic and transport studies" },
        { key: "D50000", value: "Behavioural and educational sciences" },
        { key: "D53000", value: "--- Gerontology" },
        { key: "D54000", value: "--- Pedagogics" },
        { key: "D51000", value: "--- Psychology" },
        { key: "D52000", value: "--- Educational theory" },
        { key: "D60000", value: "Social sciences" },
        { key: "D66000", value: "--- Communication sciences" },
        { key: "D63000", value: "--- Cultural anthropology" },
        { key: "D64000", value: "--- Demography" },
        { key: "D67000", value: "--- Leisure and recreation studies" },
        { key: "D62000", value: "--- Social geography" },
        { key: "D68000", value: "--- Social security studies" },
        { key: "D61000", value: "--- Sociology" },
        { key: "D65000", value: "--- Urban and rural planning" },
        { key: "D69000", value: "--- Gender studies" },
        { key: "D20000", value: "Life sciences, medicine and health care " },
        { key: "D21000", value: "--- Life sciences" },
        { key: "D21100", value: "------ Bioinformatics, biomathematics" },
        { key: "D21200", value: "------ Biophysics, clinical physics" },
        { key: "D21300", value: "------ Biochemistry" },
        { key: "D21400", value: "------ Genetics" },
        { key: "D21500", value: "------ Histology, cell biology" },
        { key: "D21600", value: "------ Anatomy, morphology" },
        { key: "D21700", value: "------ Physiology" },
        { key: "D21800", value: "------ Immunology, serology" },
        { key: "D21900", value: "------ Epidemiology and medical statistics" },
        { key: "D22000", value: "--- Biology" },
        { key: "D22100", value: "------ Microbiology" },
        { key: "D22200", value: "------ Biogeography, taxonomy" },
        { key: "D22300", value: "------ Animal ethology, animal psychology" },
        { key: "D22400", value: "------ Ecology" },
        { key: "D22500", value: "------ Botany" },
        { key: "D22600", value: "------ Zoology" },
        { key: "D22700", value: "------ Toxicology (plants, invertebrates)" },
        { key: "D23000", value: "--- Medicine" },
        { key: "D23100", value: "------ Pathology, pathological anatomy" },
        { key: "D23110", value: "--------- Infections, parasitology, virology" },
        { key: "D23120", value: "--------- Oncology" },
        { key: "D23130", value: "--------- Allergology" },
        { key: "D23140", value: "--------- Traumatology" },
        { key: "D23200", value: "------ Organs and organ systems " },
        { key: "D23210", value: "--------- Dermatology, venereology, rheumatology, orthopaedics" },
        { key: "D23211", value: "------------ Dermatology" },
        { key: "D23212", value: "------------ Venereology" },
        { key: "D23213", value: "------------ Rheumatology" },
        { key: "D23214", value: "------------ Orthopaedics" },
        { key: "D23220", value: "--------- Internal medicine" },
        { key: "D23221", value: "------------ Blood and lymphatic diseases" },
        { key: "D23222", value: "------------ Cardiovascular disorders" },
        { key: "D23223", value: "------------ Gastrointestinal system" },
        { key: "D23224", value: "------------ Gynaecology and obstetrics" },
        { key: "D23225", value: "------------ Pulmonary disorders" },
        { key: "D23226", value: "------------ Nephrology" },
        { key: "D23227", value: "------------ Urology" },
        { key: "D23230", value: "--------- Neurology, otorhinolaryngology, opthalmology" },
        { key: "D23231", value: "------------ Neurology" },
        { key: "D23232", value: "------------ Otorhinolaryngology" },
        { key: "D23233", value: "------------ Ophthalmology" },
        { key: "D23240", value: "--------- Dentistry" },
        { key: "D23300", value: "------ Medical specialisms" },
        { key: "D23310", value: "--------- Surgery" },
        { key: "D23320", value: "--------- Anesthesiology" },
        { key: "D23330", value: "--------- Radiology, radiotherapy" },
        { key: "D23340", value: "--------- Biopharmacology, toxicology" },
        { key: "D23350", value: "--------- Psychiatry, clinical psychology" },
        { key: "D23360", value: "--------- Age-related medical specialisms" },
        { key: "D23361", value: "------------ Neonatology" },
        { key: "D23362", value: "------------ Pediatrics" },
        { key: "D23363", value: "------------ Geriatrics" },
        { key: "D23370", value: "--------- Social medicine" },
        { key: "D23380", value: "--------- Primary care (including General practice)" },
        { key: "D23390", value: "--------- Occupational medicine" },
        { key: "D24000", value: "--- Health sciences" },
        { key: "D24100", value: "------ Nursing sciences" },
        { key: "D24200", value: "------ Health education, prevention" },
        { key: "D24300", value: "------ Nutrition" },
        { key: "D25000", value: "--- Kinesiology" },
        { key: "D25100", value: "------ Rehabilitation" },
        { key: "D26000", value: "--- Veterinary medicine" },
        { key: "D30100", value: "------ Digital humanities" },
        { key: "D70000", value: "Economics and Business Administration" },
        { key: "D70100", value: "--- Personnel administration and management" },
        { key: "D10000", value: "Science and technology" },
        { key: "D11000", value: "--- Mathematics" },
        { key: "D11100", value: "------ Logic, set theory and arithmetic" },
        { key: "D11200", value: "------ Algebra, group theory" },
        { key: "D11300", value: "------ Functions, differential equations" },
        { key: "D11400", value: "------ Fourier analysis, functional analysis" },
        { key: "D11500", value: "------ Geometry, topology" },
        { key: "D11600", value: "------ Probability theory, statistics" },
        { key: "D11700", value: "------ Operations research" },
        { key: "D11800", value: "------ Numerical analysis" },
        { key: "D12000", value: "--- Physics" },
        { key: "D12100", value: "------ Metrology, scientific instrumentation" },
        { key: "D12200", value: "------ Theoretical physics, (quantum) mechanics" },
        { key: "D12300", value: "------ Electromagnetism, optics, acoustics" },
        { key: "D12400", value: "------ Elementary particle physics and nuclear physics" },
        { key: "D12600", value: "------ Atomic and molecular physics" },
        { key: "D12700", value: "------ Gases, fluid dynamics, plasma physics" },
        { key: "D12800", value: "------ Solid-state physics" },
        { key: "D13000", value: "--- Chemistry" },
        { key: "D13100", value: "------ Analytical chemistry" },
        { key: "D13200", value: "------ Macromolecular chemistry, polymer chemistry" },
        { key: "D13300", value: "------ Organic chemistry" },
        { key: "D13400", value: "------ Inorganic chemistry" },
        { key: "D13500", value: "------ Physical chemistry" },
        { key: "D13600", value: "------ Catalysis" },
        { key: "D13700", value: "------ Theoretical chemistry, quantum chemistry" },
        { key: "D14000", value: "--- Technology" },
        { key: "D14100", value: "------ Materials technology" },
        { key: "D14200", value: "------ Mechanical engineering" },
        { key: "D14210", value: "--------- Technical mechanics" },
        { key: "D14220", value: "--------- Engines, energy converters" },
        { key: "D14230", value: "--------- Vehicle and transport technology" },
        { key: "D14231", value: "------------ Road vehicles, rail vehicles" },
        { key: "D14232", value: "------------ Vessels" },
        { key: "D14233", value: "------------ Aircraft and spacecraft" },
        { key: "D14240", value: "--------- Manufacturing technology, mechanical technology, robotics" },
        { key: "D14300", value: "------ Electrical engineering" },
        { key: "D14310", value: "--------- Telecommunication engineering" },
        { key: "D14320", value: "--------- Microelectronics" },
        { key: "D14330", value: "--------- Electrical energy technology" },
        { key: "D14340", value: "--------- Measurement and control engineering" },
        { key: "D14400", value: "------ Civil engineering, building technology" },
        { key: "D14410", value: "--------- Building technology" },
        { key: "D14420", value: "--------- Civil engineering" },
        { key: "D14430", value: "--------- Hydraulic engineering" },
        { key: "D14431", value: "------------ Offshore technology" },
        { key: "D14440", value: "--------- Sanitary engineering" },
        { key: "D14441", value: "------------ Drinking water supply" },
        { key: "D14442", value: "------------ Waste water treatment" },
        { key: "D14443", value: "------------ Waste treatment" },
        { key: "D14500", value: "------ Chemical technology, process technology" },
        { key: "D14510", value: "--------- Inorganic-chemical technology" },
        { key: "D14520", value: "--------- Organic-chemical technology" },
        { key: "D14530", value: "--------- Fuel technology" },
        { key: "D14540", value: "--------- Food technology" },
        { key: "D14600", value: "------ Geotechnics" },
        { key: "D14610", value: "--------- Mining engineering" },
        { key: "D14620", value: "--------- Engineering geology" },
        { key: "D14700", value: "------ Industrial design" },
        { key: "D14800", value: "------ Energy" },
        { key: "D14900", value: "------ Technology assessment" },
        { key: "D15000", value: "--- Earth sciences" },
        { key: "D15100", value: "------ Geochemistry, geophysics" },
        { key: "D15200", value: "------ Paleontology, stratigraphy" },
        { key: "D15300", value: "------ Physical geology" },
        { key: "D15400", value: "------ Petrology, mineralogy, sedimentology" },
        { key: "D15500", value: "------ Atmospheric sciences" },
        { key: "D15600", value: "------ Hydrospheric sciences" },
        { key: "D15700", value: "------ Geodesy, physical geography" },
        { key: "D16000", value: "--- Computer science" },
        { key: "D16100", value: "------ Computer systems, architectures, networks" },
        { key: "D16200", value: "------ Software, algorithms, control systems" },
        { key: "D16300", value: "------ Theoretical computer science" },
        { key: "D16400", value: "------ Information systems, databases" },
        { key: "D16500", value: "------ User interfaces, multimedia" },
        { key: "D16600", value: "------ Artificial intelligence, expert systems" },
        { key: "D16700", value: "------ Computer graphics" },
        { key: "D16800", value: "------ Computer simulation, virtual reality" },
        { key: "D17000", value: "--- Astronomy, astrophysics" },
        { key: "D18000", value: "--- Agriculture and the physical environment" },
        { key: "D18100", value: "------ Exploitation and management physical environment" },
        { key: "D18110", value: "--------- Air" },
        { key: "D18120", value: "--------- Surfacewater and groundwater" },
        { key: "D18130", value: "--------- Soil" },
        { key: "D18140", value: "--------- Nature and landscape" },
        { key: "D18200", value: "------ Plant production and animal production" },
        { key: "D18210", value: "--------- Agriculture and horticulture" },
        { key: "D18220", value: "--------- Animal husbandry" },
        { key: "D18230", value: "--------- Fisheries" },
        { key: "D18240", value: "--------- Forestry" },
        { key: "D18250", value: "--------- Agriculturural technology" },
        { key: "E10000", value: "Interdisciplinary sciences" },
        { key: "E11000", value: "--- Biotechnology" },
        { key: "E12000", value: "--- Technology in medicine and health care" },
        { key: "E13000", value: "--- Development studies" },
        { key: "E14000", value: "--- Migration, ethnic relations and multiculturalism" },
        { key: "E15000", value: "--- Environmental studies" },
        { key: "E16000", value: "--- Nanotechnology" },
        { key: "E17000", value: "--- Greenhouse gas mitigation" },
        { key: "E18000", value: "--- Biobased economy" },
        // @formatter:on
    ]}/>
)

const AlternativeIdentifierFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} schemeValues={[
        // @formatter:off
        // TODO is this list correct/complete?
        { key: "id-type:DOI",                       value: "DOI" },
        { key: "id-type:URN",                       value: "URN" },
        { key: "id-type:MENDELEY-DATA",             value: "Mendeley data" },
        { key: "id-type:ISBN",                      value: "ISBN" },
        { key: "id-type:ISSN",                      value: "ISSN" },
        { key: "id-type:NWO-PROJECTNR",             value: "NWO project no." },
        { key: "id-type:ARCHIS-ZAAK-IDENTIFICATIE", value: "Archis zaak identificatie" },
        { key: "id-type:eDNA-project",              value: "eDNA project" },
        // @formatter:on
    ]}/>
)

const DateFieldArray = (props: FieldArrayProps<SchemedValue>) => (
    <SchemedTextFieldArray {...props} schemeValues={[
        // @formatter:off
        { key: "dcterms:date",            value: "Date" }, // TODO is this one supposed to be here?
        { key: "dcterms:valid",           value: "Valid" },
        { key: "dcterms:issued",          value: "Issued" },
        { key: "dcterms:modified",        value: "Modified" },
        { key: "dcterms:dateAccepted",    value: "Date accepted" },
        { key: "dcterms:dateCopyrighted", value: "Date copyrighted" },
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
                    <RepeatableField name="alternativeIdentifiers"
                                     label="Alternative identifier"
                                     empty={emptySchemedValue}
                                     fieldNames={[
                                         (name: string) => `${name}.scheme`,
                                         (name: string) => `${name}.value`,
                                     ]}
                                     component={AlternativeIdentifierFieldArray}/>
                </div>

                <div className="row form-group input-element">
                    <p>Related identifier</p>
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
                                         (name: string) => `${name}.qualifier`,
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
