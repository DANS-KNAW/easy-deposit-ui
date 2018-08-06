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
import { PromiseAction } from "../lib/redux"
import { FileOverviewConstants } from "../constants/fileOverviewConstants"
import axios from "axios"
import { listFilesURL} from "../constants/serverRoutes"
import { Action } from "redux"
import { DepositId } from "../model/Deposits"
import { filesConverter } from "../lib/files/files"

export const fetchFiles: (depositId: DepositId, dirPath: string) => PromiseAction<void> = (depositId, dirPath) => ({
    type: FileOverviewConstants.FETCH_FILES,
    async payload() {
        const url = await listFilesURL(depositId, dirPath)
        const response = await axios.get(url)
        return response.data
    },
    meta: {
        transform: filesConverter,
    },
})

export const cleanFiles: () => Action = () => ({
    type: FileOverviewConstants.CLEAN_FILES,
})

// TODO delete/update not yet used (think upload)
