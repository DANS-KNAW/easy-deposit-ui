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
import { expect } from "chai"
import { describe, it } from "mocha"
import { filesConverter } from "../../../../main/typescript/lib/files/files"
import { Files } from "../../../../main/typescript/model/FileInfo"

describe("files", () => {
    describe("filesConverter", () => {
        it("should convert a valid sequence of fileInfos and split them correctly into Files", () => {
            const input = [
                {
                    dirpath: "leesplankje/firstrow/",
                    filename: "aap.txt",
                    sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
                },
                {
                    dirpath: "leesplankje/firstrow/",
                    filename: "noot.txt",
                    sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
                },
            ]

            const expected: Files = {
                "leesplankje/firstrow/noot.txt": {
                    dirpath: "leesplankje/firstrow/",
                    filename: "noot.txt",
                    sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
                },
                "leesplankje/firstrow/aap.txt": {
                    dirpath: "leesplankje/firstrow/",
                    filename: "aap.txt",
                    sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
                },
            }

            expect(filesConverter(input)).to.eql(expected)
        })
    })
})
