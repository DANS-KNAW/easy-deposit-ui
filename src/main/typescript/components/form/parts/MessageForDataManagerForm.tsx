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
import { Component, TextareaHTMLAttributes } from "react"
import { Field, WrappedFieldProps } from "redux-form"
import "../../../../resources/css/form.css"

export interface MessageForDataManagerFormData {
    messageForDataManager?: string
}

interface MessageForDataManagerFormProps {
}

const TextArea = ({input, meta, ...rest}: WrappedFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return <textarea {...input} {...rest}/>
}

class MessageForDataManagerForm extends Component<MessageForDataManagerFormProps> {
    render() {
        return (
            <div className="container pl-0 pr-0">
                <div className="row ml-0 mr-0 form-group input-element">
                    <label htmlFor="messageForDataManager"
                           className="col-12 col-md-3 pl-0">
                        Message for the data manager
                    </label>
                    <Field name="messageForDataManager"
                           id="messageForDataManager"
                           className="form-control col-12 col-md-9"
                           rows={10}
                           component={TextArea}/>
                </div>
            </div>
        )
    }
}

export default MessageForDataManagerForm
