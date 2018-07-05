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
import { DropdownList, DropdownListEntry } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import { WrappedFieldProps } from "redux-form"
import { Component, SelectHTMLAttributes } from "react"
import asField from "../../../../lib/formComponents/FieldHOC"
import { RadioChoicesInput } from "../../../../lib/formComponents/RadioChoices"

interface LicenseChoicesProps {
    choices: DropdownListEntry[]
}

interface LicenseChoicesState {
    showCount: number
}

class LicenseChoices extends Component<WrappedFieldProps & LicenseChoicesProps, LicenseChoicesState> {
    constructor(props: WrappedFieldProps & LicenseChoicesProps) {
        super(props)
        this.state = {
            showCount: 1,
        }
    }

    showMoreLicenses: () => void = () => {
        switch (this.state.showCount) {
            case 1:
                this.setState(prevState => ({ ...prevState, showCount: 3 }))
                break
            case 3:
            default:
                this.setState(prevState => ({ ...prevState, showCount: Infinity }))
                break
        }
    }

    radioChoice = (text: string, link: string) => (
        <span><a className="external-link" href={link} target="_blank"><i className="fas fa-external-link-square-alt"/></a> {text}</span>
    )

    render() {
        if (this.state.showCount < 1)
            this.setState(prevState => ({ ...prevState, showCount: 1 }))

        const actualChoices = this.props.choices.slice(0, this.state.showCount).map(entry => ({
            title: entry.key,
            value: this.radioChoice(entry.value, entry.key),
        }))
        const value = this.props.input.value
        if (!actualChoices.find(({ title }) => title === value)) {
            const original = this.props.choices.find(({ key }) => key === value)
            if (original) {
                actualChoices.push({
                    title: original.key,
                    value: this.radioChoice(original.value, original.key),
                })
            }
        }
        const containsAllChoices = this.props.choices.length < this.state.showCount

        const radioChoices = <RadioChoicesInput {...this.props} divClassName="radio-choices" choices={actualChoices}/>
        const showMore = !containsAllChoices && <a className="show-more" onClick={this.showMoreLicenses}>show more...</a>

        return (
            <div className="license-field">
                {radioChoices}
                {showMore}
            </div>
        )
    }
}

const LicenseChoicesField = asField(LicenseChoices)

interface LicenseFieldInputProps {
    withLabel?: boolean
    withEmptyDefault?: boolean
}

type LicenseFieldProps = WrappedFieldProps & SelectHTMLAttributes<HTMLSelectElement> & LicenseFieldInputProps

const LicenseField = ({ state, list }: DropdownList) => (props: LicenseFieldProps) => (
    <LoadDropdownData state={state}>
        <LicenseChoicesField {...props} choices={list}/>
    </LoadDropdownData>
)

export default LicenseField
