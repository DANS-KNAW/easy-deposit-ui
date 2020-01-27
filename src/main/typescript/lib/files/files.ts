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
import { partition } from "lodash"
import { isEmptyFile, isLargeFile } from "../../components/form/Validation"
import { FileInfo, Files } from "../../model/DepositForm"

export const filesConverter: (input: any) => Files = input => {
    const files: FileInfo[] = input.map(fileConverter)
    const [specialFiles, nonEmptyFiles] = partition(files, fileInfo => isEmptyFile(fileInfo) || isLargeFile(fileInfo))

    // note: special files are placed first to make sure validation errors appear at the top of the file listing
    return [...specialFiles, ...nonEmptyFiles]
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
        size: input.size,
        fullpath: input.dirpath && input.dirpath !== "" ? input.dirpath + "/" + input.filename : input.filename,
    }
}
