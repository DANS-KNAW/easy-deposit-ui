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
import { FileInfo, Files } from "../../model/FileInfo"

export const filesConverter: (input: any) => Files = input => {
    return input.map(fileConverter)
        .reduce((obj: Files, item: FileInfo) => {
            obj[item.fullpath] = item
            return obj
        }, {})
}

const fileConverter: (input: any) => FileInfo = input => {
    return {
        filename: input.filename,
        dirpath: input.dirpath,
        sha1sum: input.sha1sum,
        fullpath: input.dirpath && input.dirpath !== "" ? input.dirpath + "/" + input.filename : input.filename
    }
}
