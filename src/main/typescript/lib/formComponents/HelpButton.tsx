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
import { useDispatch } from "react-redux"
import { toggleHelpText } from "../../actions/helpTextActions"
import { useSelector } from "../redux"
import { isHelpTextDisplayable, isHelpTextVisible } from "../../selectors/helpTexts"

interface HelpButtonProps {
    textFor: any
}

const HelpButton = (props: HelpButtonProps) => {
    const toggled = useSelector(isHelpTextVisible(props.textFor))
    const displayable = useSelector(isHelpTextDisplayable(props.textFor))
    const dispatch = useDispatch()

    const doToggleHelpText = () => dispatch(toggleHelpText(props.textFor))

    const className = "fas fa-info-circle help" + (toggled ? " toggled" : "")
    return displayable ? <i className={className} onClick={doToggleHelpText}/> : null
}

export default HelpButton
