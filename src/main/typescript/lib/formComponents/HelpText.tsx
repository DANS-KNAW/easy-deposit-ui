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
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Loading from "../../components/Loading"
import { useSelector } from "../redux"
import { fetchHelpText, unregisterHelpText } from "../../actions/helpTextActions"
import { getHelpTextState } from "../../selectors/helpTexts"

interface HelpTextProps {
    textFor: string
}

const HelpText = ({ textFor }: HelpTextProps) => {
    const { visible, fetching, fetched, text, fetchError } = useSelector(getHelpTextState(textFor))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchHelpText(textFor))

        return function cleanUp() {
            dispatch(unregisterHelpText(textFor))
        }
    }, [])

    return visible
        ? <>
            {fetching && <Loading/>}
            {fetched && <div className="help-text" dangerouslySetInnerHTML={{ __html: text }}/>}
            {fetchError && <i style={{ color: "red" }}>{fetchError}</i>}
        </>
        : null
}

export default HelpText
