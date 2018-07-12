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
import { Field } from "redux-form"
import TextArea from "../../../lib/formComponents/TextArea"

export interface MessageForDataManagerFormData {
    messageForDataManager?: string
}

const MessageForDataManagerForm = () => (
    <>
        {/* TODO this field must be wider */}
        <Field name="messageForDataManager"
               rows={10}
               maxRows={20}
               maxHeight={500}
               label="Message for the data manager"
               component={TextArea}/>
    </>
)

export default MessageForDataManagerForm
