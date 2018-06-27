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
