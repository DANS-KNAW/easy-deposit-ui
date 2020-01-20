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
                    dirpath: "leesplankje/firstrow",
                    filename: "aap.txt",
                    sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
                    size: 10,
                },
                {
                    dirpath: "leesplankje/firstrow",
                    filename: "noot.txt",
                    sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
                    size: 9,
                },
            ]

            const expected: Files = {
                "leesplankje/firstrow/aap.txt": {
                    dirpath: "leesplankje/firstrow",
                    filename: "aap.txt",
                    fullpath: "leesplankje/firstrow/aap.txt",
                    sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
                    size: 10,
                },
                "leesplankje/firstrow/noot.txt": {
                    dirpath: "leesplankje/firstrow",
                    filename: "noot.txt",
                    fullpath: "leesplankje/firstrow/noot.txt",
                    sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
                    size: 9,
                },
            }

            const result = filesConverter(input)

            expect(result).to.eql(expected)
            expect(Object.keys(result)).to.eql(Object.keys(expected))
        })

        it("should put empty and large files before all other files", () => {
            const input = [
                {
                    dirpath: "leesplankje/firstrow",
                    filename: "aap.txt",
                    sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
                    size: 10,
                },
                {
                    dirpath: "",
                    filename: "empty file.txt",
                    sha1sum: "xxx",
                    size: 0,
                },
                {
                    dirpath: "leesplankje/firstrow",
                    filename: "noot.txt",
                    sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
                    size: 9,
                },
                {
                    dirpath: "",
                    filename: "large file.txt",
                    sha1sum: "yyy",
                    size: 15,
                },
            ]

            const expected: Files = {
                "empty file.txt": {
                    dirpath: "",
                    filename: "empty file.txt",
                    fullpath: "empty file.txt",
                    sha1sum: "xxx",
                    size: 0,
                },
                "large file.txt": {
                    dirpath: "",
                    filename: "large file.txt",
                    fullpath: "large file.txt",
                    sha1sum: "yyy",
                    size: 15,
                },
                "leesplankje/firstrow/aap.txt": {
                    dirpath: "leesplankje/firstrow",
                    filename: "aap.txt",
                    fullpath: "leesplankje/firstrow/aap.txt",
                    sha1sum: "ab3aa0555f31a8d7809fae4b03a95195edb01f5c",
                    size: 10,
                },
                "leesplankje/firstrow/noot.txt": {
                    dirpath: "leesplankje/firstrow",
                    filename: "noot.txt",
                    fullpath: "leesplankje/firstrow/noot.txt",
                    sha1sum: "de3aa0555f31a8d7809fae4b03a95195edb09f1e",
                    size: 9,
                },
            }

            const result = filesConverter(input)

            expect(result).to.eql(expected)
            expect(Object.keys(result)).to.eql(Object.keys(expected))
        })
    })
})
