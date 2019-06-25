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
import { SelectHTMLAttributes, useEffect, useState } from "react"
import { DropdownList, DropdownListEntry } from "../../../../model/DropdownLists"
import LoadDropdownData from "../../../../lib/formComponents/LoadDropdownData"
import asField from "../../../../lib/formComponents/FieldHOC"
import { RadioChoicesInput } from "../../../../lib/formComponents/RadioChoices"
import { FieldProps } from "../../../../lib/formComponents/ReduxFormUtils"

interface LicenseChoicesProps {
    choices: DropdownListEntry[]
    className: string
}

type Choice = { title: string, value: any }

const LicenseChoices = (props: FieldProps & LicenseChoicesProps) => {
    const [showCount, setShowCount] = useState(1)

    useEffect(() => setShowCount(1), [props.choices])

    const showMoreLicenses = () => {
        switch (showCount) {
            case 1:
                setShowCount(3)
                break
            case 3:
            default:
                setShowCount(Infinity)
                break
        }
    }

    const showLessLicenses = () => {
        switch (showCount) {
            case 1:
                break
            case 3:
                setShowCount(1)
                break
            default:
                setShowCount(3)
                break
        }
    }

    const radioChoice = (text: string, link: string) => (
        <span><a className="external-link" href={link} target="_blank"><i className="fas fa-external-link-square-alt"/></a> {text}</span>
    )

    const renderNoLicenses = () => (
        <label className="mb-0" style={{ paddingTop: "5px" }}>
            <i>Choose an accessright first</i>
        </label>
    )

    const renderLicenses = (choices: Choice[]) => (
        <div className={`license-field ${props.className || ""}`}>
            <RadioChoicesInput {...props} divClassName="radio-choices" choices={choices}/>
            {props.choices.length > showCount && renderShowMore()}
            {props.choices.length < showCount && renderShowLess()}
        </div>
    )

    const renderShowMore = () => <a className="show-more" onClick={showMoreLicenses}>show more...</a>

    const renderShowLess = () => <a className="show-less" onClick={showLessLicenses}>show less...</a>

    if (showCount < 1)
        setShowCount(1)

    const value = props.input.value
    const choices = props.choices.slice(0, showCount).map(entry => ({
        title: entry.key,
        value: radioChoice(entry.value, entry.key),
    }))

    if (showCount !== Infinity && !choices.find(({ title }) => title === value)) {
        const original = props.choices.find(({ key }) => key === value)
        if (original) {
            choices.push({
                title: original.key,
                value: radioChoice(original.value, original.key),
            })
        }
    }

    return choices.length === 0 ? renderNoLicenses() : renderLicenses(choices)
}

const LicenseChoicesField = asField(LicenseChoices)

interface LicenseFieldInputProps {
    withLabel?: boolean
    withEmptyDefault?: boolean
    dropdown: DropdownList
}

type LicenseFieldProps = FieldProps & SelectHTMLAttributes<HTMLSelectElement> & LicenseFieldInputProps

const LicenseField = ({ dropdown: { state, list }, ...props }: LicenseFieldProps) => (
    <LoadDropdownData state={state}>
        <LicenseChoicesField {...props} choices={list}/>
    </LoadDropdownData>
)

export default LicenseField
