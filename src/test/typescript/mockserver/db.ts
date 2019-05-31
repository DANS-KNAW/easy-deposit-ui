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
import * as uuid from "uuid/v4"
import immutable from "object-path-immutable"
import { Deposit, depositData1, depositData2, depositData3, depositData4, paginationDataset, State } from "./deposit"
import { allfields, Doi, DansIdentifierSchemeValues, mandatoryOnly, Metadata, newMetadata } from "./metadata"
import { User, User001 } from "./user"
import { directory1, FileInfo, newFileInfos } from "./fileinfo"

interface DataPerDraft {
    deposit: Deposit
    files?: FileInfo[]
    metadata?: Metadata
}

export type DepositId = string
export type Data = { [id: string]: DataPerDraft }

let data: Data = {
    "93674123-1699-49c5-af91-ed31db19adc9": {
        deposit: depositData1,
        files: directory1,
        metadata: allfields,
    },
    "1d946f5b-e53b-4f71-b1f3-7481475d07db": {
        deposit: depositData2,
        metadata: mandatoryOnly,
    },
    "a145a1be-5463-4b10-a621-a9e511ff7f20": {
        deposit: depositData3,
    },
    "5befec97-1e57-4210-b7b6-57a604aaef47": {
        deposit: depositData4,
    },
    // these deposits are here to show pagination
    // they all point to a archived datasets, so they're not clickable
    // "996caaaf-ba7e-47f6-ae80-189905b78bf6": { deposit: paginationDataset(0) },
    // "8709f166-5e0a-47d9-8eff-1ba9335de9f5": { deposit: paginationDataset(1) },
    // "4c9e0b4f-b249-4b30-9354-b8cb7204fdab": { deposit: paginationDataset(2) },
    // "12a36e1a-2849-4508-9de7-e7025328429c": { deposit: paginationDataset(3) },
    // "ccf5fb1f-b6f1-4af8-9e8a-48fa8fa2fc97": { deposit: paginationDataset(4) },
    // "1c9055e2-f132-41f5-ba67-08dd291a60ec": { deposit: paginationDataset(5) },
    // "54bda5e9-9a6f-45c1-8782-cef546bf2a2f": { deposit: paginationDataset(6) },
    // "f544920a-d964-4bd3-b92a-b2563a34d1c8": { deposit: paginationDataset(7) },
    // "85c5b197-72fb-4a01-b33e-33cb2e4b4e00": { deposit: paginationDataset(8) },
    // "6525a325-b8be-474a-822e-0e06ab39ca35": { deposit: paginationDataset(9) },
    // "900d23c5-5718-4849-aba2-8c47c4d8cd5d": { deposit: paginationDataset(10) },
    // "1516d0ec-f095-45da-8372-1b9318076118": { deposit: paginationDataset(11) },
    // "92a75b75-0542-41be-95b2-41d059e0d626": { deposit: paginationDataset(12) },
    // "186eb722-9a4a-4f16-b4e4-8be5a92cc8e2": { deposit: paginationDataset(13) },
    // "e8545f83-52c2-4444-9822-e6575d87a919": { deposit: paginationDataset(14) },
    // "19525e8f-1cef-44fd-aa35-159fd25d4b52": { deposit: paginationDataset(15) },
    // "a4da60f1-5631-4299-bb06-0b2a3754adee": { deposit: paginationDataset(16) },
    // "d90366e3-e99c-46a9-a7b2-015296d0f645": { deposit: paginationDataset(17) },
    // "3f9edcba-0fcf-4ef6-b0ef-cfd7712edeff": { deposit: paginationDataset(18) },
    // "585c3950-0dcd-475f-acf9-b441ebfd2503": { deposit: paginationDataset(19) },
    // "b9e3a48c-9f29-4750-b613-d0ac8ea57be4": { deposit: paginationDataset(20) },
    // "996a6fd2-697e-4c42-80c9-02dfa78d773b": { deposit: paginationDataset(21) },
    // "f32e2d5c-449c-424a-b6bc-e703adf73ba5": { deposit: paginationDataset(22) },
    // "8d0502cc-1dbb-4d56-a6bd-61db43eb0e75": { deposit: paginationDataset(23) },
    // "76f05655-decd-4584-ab45-921686d17519": { deposit: paginationDataset(24) },
    // "95382701-f4bf-4768-8233-785174896546": { deposit: paginationDataset(25) },
    // "d6d881c1-bc15-4775-a1af-dd4d778c57be": { deposit: paginationDataset(26) },
    // "de497950-2680-49c0-8ae2-e345802cb1f1": { deposit: paginationDataset(27) },
    // "da7a3c13-4c05-4283-b151-c4cd6d737b39": { deposit: paginationDataset(28) },
    // "6e86453c-a895-4c6a-9e6c-7acf2e8df150": { deposit: paginationDataset(29) },
    // "e53ee12d-4f2e-4d08-b80f-0e0ea7e5d492": { deposit: paginationDataset(30) },
    // "c1ad3dcd-db6d-4fc8-b862-821d482bda0f": { deposit: paginationDataset(31) },
    // "93ddb9b9-716f-40da-aba4-9b49d11cda15": { deposit: paginationDataset(32) },
    // "1c9cf01f-d22c-49bb-bf63-9345c31ed347": { deposit: paginationDataset(33) },
    // "f0ae6126-77d8-469f-a022-cdd5cb1f9c63": { deposit: paginationDataset(34) },
    // "44901f7f-98bd-4514-8c85-9e9a63065181": { deposit: paginationDataset(35) },
    // "73cd48a5-ee47-40df-8d70-d6a17fc32123": { deposit: paginationDataset(36) },
    // "d28e375c-e24e-430b-bede-61bff096ab74": { deposit: paginationDataset(37) },
    // "51722325-1272-4a8b-a52b-410a181287b9": { deposit: paginationDataset(38) },
    // "e620d271-c2b8-4f83-bf68-6f9892ce7e5a": { deposit: paginationDataset(39) },
    // "b81144b4-b3c4-4d49-9e99-643c1959928d": { deposit: paginationDataset(40) },
    // "2a82ffef-c552-4920-b207-551bde9e1ec3": { deposit: paginationDataset(41) },
    // "a279333f-0296-45f9-a387-71f75a41f4d5": { deposit: paginationDataset(42) },
    // "f2e805f5-f24f-43ad-86e6-271a04c4f7db": { deposit: paginationDataset(43) },
    // "2c859dcb-91bb-415f-b956-4070354f4874": { deposit: paginationDataset(44) },
    // "f69840c4-587e-4f42-a590-91809fd0c271": { deposit: paginationDataset(45) },
    // "f09826cb-a067-4b6c-a6dc-bc4eae6039a1": { deposit: paginationDataset(46) },
    // "4939ce34-a782-4a99-a86b-94e6668dad05": { deposit: paginationDataset(47) },
    // "b8dc96b2-bdf1-4983-b76c-a8820b4a4434": { deposit: paginationDataset(48) },
    // "3705d9b5-3cae-4492-8301-5b6f2bf7734c": { deposit: paginationDataset(49) },
    // "cb89c014-d465-4c80-af7c-eb1951aec765": { deposit: paginationDataset(50) },
    // "f26bf0df-b75b-449a-b1a0-8c1b28096bb3": { deposit: paginationDataset(51) },
    // "cd5e2a92-4e8e-49a5-b437-7399cbf456ea": { deposit: paginationDataset(52) },
    // "c9d877b7-51f4-4af9-b85c-83f570257141": { deposit: paginationDataset(53) },
    // "a8609d1e-95a4-4bf7-a21e-0c1f5f392ee0": { deposit: paginationDataset(54) },
    // "d23cdc24-8dca-4c31-ab22-87383aa90856": { deposit: paginationDataset(55) },
    // "a9cbb82f-51b8-4780-a979-573fc4630152": { deposit: paginationDataset(56) },
    // "91417353-1f2f-4e74-bce4-25740b252733": { deposit: paginationDataset(57) },
    // "ee7ec74b-30ef-42f6-90c7-44e821c88830": { deposit: paginationDataset(58) },
    // "4ceea879-5bfd-463c-b861-c6f791a41554": { deposit: paginationDataset(59) },
    // "cf43de18-85c4-4c76-b6cd-d48c59453885": { deposit: paginationDataset(60) },
    // "33937ae5-c18d-42b6-a299-ded7c5e04e42": { deposit: paginationDataset(61) },
    // "4a1d3ca9-c672-4004-bf08-c02d7ebc9a3b": { deposit: paginationDataset(62) },
    // "a9a98ea3-db88-4a2b-82cb-f28fc19d11e8": { deposit: paginationDataset(63) },
    // "0d29c93b-f20d-4d02-be05-95c63e9ccac8": { deposit: paginationDataset(64) },
    // "6fa2e6d0-b480-4d46-82a6-1379df328d86": { deposit: paginationDataset(65) },
    // "bb9d0621-9444-4ad2-bcb6-4a80ba3d61f6": { deposit: paginationDataset(66) },
    // "83b3417e-826c-4abd-8ad7-b2a387bf9aa7": { deposit: paginationDataset(67) },
    // "ec571978-e33f-4f5a-9bfc-5e35db602f59": { deposit: paginationDataset(68) },
    // "03bba2e0-eab5-427f-8f2f-23060aca05ba": { deposit: paginationDataset(69) },
    // "62519ec8-ea3b-4cd6-9640-0887c54b40e5": { deposit: paginationDataset(70) },
    // "e6691f09-5ade-46e8-bba9-c95a69785cfa": { deposit: paginationDataset(71) },
    // "a18335ec-9410-4fc1-8ba1-853390b38077": { deposit: paginationDataset(72) },
    // "caf71a8a-079a-4c2b-9837-35906ef2be1a": { deposit: paginationDataset(73) },
    // "8505b109-ef28-46a0-8758-de6f49d9c8d4": { deposit: paginationDataset(74) },
    // "6d860245-9722-41d2-86d3-2bcf473e00af": { deposit: paginationDataset(75) },
    // "d0ee6075-57ae-4eb2-b418-9e65ccc9c676": { deposit: paginationDataset(76) },
    // "4322dbb7-ae18-4545-9ce0-1a83e2fcd289": { deposit: paginationDataset(77) },
    // "25ca5913-96e3-4325-bbfa-b7882d3090c0": { deposit: paginationDataset(78) },
    // "2bbe57e3-2c59-4aaf-8138-e9eec0a76080": { deposit: paginationDataset(79) },
    // "0d7e0573-6cc1-403c-bcef-eed405d1a7bc": { deposit: paginationDataset(80) },
    // "901c7789-8b39-491c-a24a-403e232baef2": { deposit: paginationDataset(81) },
    // "471b73b3-a7f0-4e37-afd7-848f87098c81": { deposit: paginationDataset(82) },
    // "0bc5469b-9673-4798-b62a-dea72e74af40": { deposit: paginationDataset(83) },
    // "4846c845-f19a-467d-9328-d567be4c6091": { deposit: paginationDataset(84) },
    // "9e61579b-e8d5-4515-8151-9f262c2327be": { deposit: paginationDataset(85) },
    // "b5d8de5b-4f25-4187-a2dd-6bcf382428a4": { deposit: paginationDataset(86) },
    // "3e78c9c1-6db2-49c7-84a7-4f37b99f8a22": { deposit: paginationDataset(87) },
    // "a66ee3ac-67a2-478a-a797-8da1058cbd69": { deposit: paginationDataset(88) },
    // "eaf0c3e7-7fb2-4905-b37c-4631d6b5d7d3": { deposit: paginationDataset(89) },
    // "eec39fca-979b-4400-b504-3ed1d66cf2b4": { deposit: paginationDataset(90) },
    // "bd980823-e6f6-4ac4-bf7e-4016a6c33ed2": { deposit: paginationDataset(91) },
    // "bd9159d2-b324-4da1-a0aa-d90697b05830": { deposit: paginationDataset(92) },
    // "6f9eb185-cc27-43d2-b7c7-11ee6781d451": { deposit: paginationDataset(93) },
    // "ddfd869c-07d7-4428-9fea-e99ba02aaa9f": { deposit: paginationDataset(94) },
    // "2cd6d21a-9cca-4db7-8697-f2758401e854": { deposit: paginationDataset(95) },
    // "0dc97c4b-6070-45e9-a05d-8ac2137b7b80": { deposit: paginationDataset(96) },
    // "62c63c46-5511-4f65-a8a6-a91000c6fa10": { deposit: paginationDataset(97) },
    // "2e0f10e9-1f21-4f53-8f11-1e9b8c6345cc": { deposit: paginationDataset(98) },
    // "c1d5d77a-c224-4879-abc0-f1b36be5216f": { deposit: paginationDataset(99) },
    // "8fcc7819-52a0-4890-9029-106328ca3bae": { deposit: paginationDataset(100) },
}

export const listDeposits: () => (Deposit & { id: DepositId })[] = () => {
    return Object.keys(data).map(id => ({ id, ...data[id].deposit }))
}

export const getDeposit: (id: DepositId) => Deposit & { id: DepositId } | undefined = id => {
    return data[id]
        ? { id: id, ...data[id].deposit }
        : undefined
}

const newDeposit: () => Deposit = () => ({
    title: "",
    state: "DRAFT",
    stateDescription: "",
    date: new Date().toISOString(),
})
export const createDeposit: () => Deposit & { id: DepositId } = () => {
    const id = uuid()
    const deposit = newDeposit()
    const metadata = newMetadata()
    const files = newFileInfos()
    data = { ...data, [id]: { deposit, metadata, files } }
    return { id, ...deposit }
}

export const deleteDeposit: (id: DepositId) => boolean = id => {
    if (data[id]) {
        data = immutable.del(data, id)
        return true
    }
    else {
        return false
    }
}

export const getState: (id: DepositId) => State | undefined = id => {
    return data[id]
        ? { state: data[id].deposit.state, stateDescription: data[id].deposit.stateDescription }
        : undefined
}

export const setState: (id: DepositId, state: State) => boolean = (id, state) => {
    if (data[id]) {
        data = {
            ...data,
            [id]: {
                ...data[id],
                deposit: { ...data[id].deposit, state: state.state, stateDescription: state.stateDescription },
            },
        }
        return true
    }
    else return false
}

export const hasMetadata: (id: DepositId) => boolean = id => {
    return data[id]
        ? data[id].metadata !== undefined
        : false
}

export const getMetadata: (id: DepositId) => Metadata | undefined = id => {
    return data[id]
        ? data[id].metadata
        : undefined
}

export const setMetadata: (id: DepositId, metadata: Metadata) => void = (id, metadata) => {
    if (data[id]) {
        data = { ...data, [id]: { ...data[id], metadata } }
    }
    else return false
}

export const getDoi: (id: DepositId) => Doi | undefined = id => {
    if (data[id]) {
        const metadata = data[id].metadata
        if (metadata && metadata.identifiers) {
            const sv = metadata.identifiers.find(sv => sv.scheme === DansIdentifierSchemeValues.DOI)
            if (sv)
                return sv.value
            else {
                const doi = generateNewDoi()

                data = {
                    ...data,
                    [id]: {
                        ...data[id],
                        metadata: {
                            ...metadata,
                            identifiers: [...metadata.identifiers, {
                                scheme: DansIdentifierSchemeValues.DOI,
                                value: doi,
                            }],
                        },
                    },
                }

                return doi
            }
        }
        else if (metadata && !metadata.identifiers) {
            const doi = generateNewDoi()

            data = {
                ...data,
                [id]: {
                    ...data[id],
                    metadata: {
                        ...metadata,
                        identifiers: [{ scheme: DansIdentifierSchemeValues.DOI, value: doi }],
                    },
                },
            }

            return doi
        }
    }
    else
        return undefined
}

const generateNewDoi = () => `10.17632/DANS.${uuid().substr(0, 10)}.1`

export const getUser: () => User = () => {
    return User001
}

export const getFilesListing: (id: DepositId) => FileInfo[] | undefined = id => {
    return data[id]
        ? (data[id].files || []).map(info => {
            if (info.dirpath.startsWith("/")) {
                return {
                    ...info,
                    dirpath: info.dirpath.substring(1),
                }
            }
            else
                return info
        })
        : undefined
}

export const addFile: (id: DepositId, dirPath: string, filename: string) => boolean = (id, dirPath, filename) => {
    const deposit = data[id]
    if (deposit) {
        const files = deposit.files

        if (files) {
            const newFile: FileInfo = {
                filename: filename,
                dirpath: dirPath,
                sha1sum: "unknown",
            }
            data = { ...data, [id]: { ...deposit, files: [...files, newFile] } }
            return true
        }
    }
    return false
}

export const deleteFile: (id: DepositId, query: string) => boolean = (id, query) => {
    const deposit = data[id]
    if (deposit) {
        const files = deposit.files
        if (files) {
            const queryMatcher = (info: FileInfo) => info.dirpath && info.dirpath !== "" && info.dirpath !== "/"
                ? info.dirpath + "/" + info.filename
                : "/" + info.filename

            const fileToDelete = files.find(info => query === queryMatcher(info))
            if (fileToDelete) {
                const remainingFiles = files.filter(info => info !== fileToDelete)
                data = { ...data, [id]: { ...deposit, files: remainingFiles } }
                return true
            }
            else {
                const remainingFiles = files.filter(info => !info.dirpath.startsWith(query))
                if (remainingFiles.length === files.length) // no files were deleted
                    return false
                else {
                    data = { ...data, [id]: { ...deposit, files: remainingFiles } }
                    return true
                }
            }
        }
        else
            return false
    }
    else
        return false
}
