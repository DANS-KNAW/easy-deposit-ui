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
export interface FileInfo {
    filename: string
    dirpath: string
    sha1sum: string
}

const file1: FileInfo = {
    filename: "aap.txt",
    dirpath: "/leesplankje/firstrow/",
    sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
}

const file2: FileInfo = {
    filename: "noot.txt",
    dirpath: "/leesplankje/firstrow/",
    sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
}

const file3: FileInfo = {
    filename: "teun.txt",
    dirpath: "/leesplankje/secondrow/",
    sha1sum: "ef4bb1666042b9e891a0bf5c14ba6206fec1a02f",
}

export const directory1: FileInfo[] = [
    file1,
    file2,
    file3,
]

export const newFileInfos: () => FileInfo[] = () => []
