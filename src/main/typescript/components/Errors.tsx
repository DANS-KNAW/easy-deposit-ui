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
import { FC } from "react"

export const Alert: FC = ({ children }) => <div className="alert alert-danger" role="alert">{children}</div>

interface ReloadAlertProps {
    reload: () => any
}

export const ReloadAlert: FC<ReloadAlertProps> = ({ reload, children }) => (
    <div className="alert alert-danger alert-dismissible" role="alert">
        {children}
        <button type="button" className="close icon" onClick={reload}>
            <i className="fas fa-sync-alt"/>
        </button>
    </div>
)

export const CloseableWarning: FC = ({ children }) => (
    <div className="alert alert-warning alert-dismissible fade show"
         role="alert">
        {children}
        <button type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
)
