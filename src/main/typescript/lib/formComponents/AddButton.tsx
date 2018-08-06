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

interface AddButtonProps {
    onClick: () => void
}

const AddButton = ({ onClick }: AddButtonProps) => (
    <button type="button"
            className="input-group-text bg-success text-light"
            onClick={onClick}>
        <i className="fas fa-plus-square"/>
    </button>
)

export default AddButton
