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
import { useEffect, useState } from "react"
import { range } from "lodash"
import "../../resources/css/paginationable.css"

interface PaginationableProps<T> {
    entryDescription: string
    pagesShown: number
    entries: T[]
    renderEntries: (entries: T[], entryCount: number) => any
}

function Paginationable<T>({ entryDescription, pagesShown, entries, renderEntries }: PaginationableProps<T>) {
    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(10)

    const entriesToBeRendered = entries.slice(currentStartIndex, currentStartIndex + entriesPerPage) // end index is exclusive
    const entryCount = entries.length
    const currentEndIndex = Math.min(entryCount, currentStartIndex + entriesPerPage)
    const hasNextPage = currentStartIndex + entriesPerPage < entryCount
    const hasPreviousPage = currentStartIndex - entriesPerPage >= 0
    const maxPage = Math.ceil(entryCount / entriesPerPage)
    const currentPage = currentStartIndex / entriesPerPage

    const nextPage = () => hasNextPage && setCurrentStartIndex(currentStartIndex + entriesPerPage)
    const previousPage = () => hasPreviousPage && setCurrentStartIndex(currentStartIndex - entriesPerPage)
    const gotoPage = (n: number) => entriesPerPage * n < entryCount && setCurrentStartIndex(entriesPerPage * n)
    const showPages: () => number[] = () => {
        const halfPS = Math.floor(pagesShown / 2)
        const [start, end] = 0 <= currentPage && currentPage <= halfPS
            ? [0, Math.min(maxPage, pagesShown)]
            : maxPage - 1 - halfPS <= currentPage && currentPage <= maxPage
                ? [maxPage - pagesShown, maxPage]
                : [currentPage - halfPS, currentPage + halfPS + 1]

        return range(start, end, 1)
    }

    useEffect(() => {
        if (currentStartIndex >= entryCount)
            previousPage()
        else if (currentStartIndex < 0)
            nextPage()
    })

    const renderShowEntriesDropdown = () => (
        <label className="mb-2">
            {"Show "}
            <select value={entriesPerPage} onChange={event => setEntriesPerPage(Number(event.target.value))}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
            </select>
            {` ${entryDescription}`}
        </label>
    )

    const renderShowingCount = () => {
        const startIndex = currentStartIndex + 1

        return `Showing ${startIndex} to ${currentEndIndex} of ${entryCount} ${entryDescription}`
    }

    const renderPagination = () => (
        <nav>
            <ul className="pagination justify-content-end mb-0">
                <li className={`page-item ${!hasPreviousPage && "disabled"}`.trim()}>
                    <div className="page-link" onClick={() => hasPreviousPage && previousPage()}>
                        <span>&laquo;</span>
                    </div>
                </li>
                {
                    showPages().map(index => {
                        const isCurrentPage = currentPage === index
                        return (
                            <li className={`page-item ${isCurrentPage && "active"}`.trim()}
                                key={`pagination_page_${index + 1}`}>
                                <div className="page-link" onClick={() => gotoPage(index)}>
                                    {index + 1}
                                </div>
                            </li>
                        )
                    })
                }
                <li className={`page-item ${!hasNextPage && "disabled"}`.trim()}>
                    <div className="page-link" onClick={() => hasNextPage && nextPage()}>
                        <span>&raquo;</span>
                    </div>
                </li>
            </ul>
        </nav>
    )

    return (
        <div>
            {renderShowEntriesDropdown()}
            {renderEntries(entriesToBeRendered, entryCount)}
            <div className="row ml-0 mr-0 paginationable_bottom">
                <div className="col-12 col-sm-6 col-md-5 pl-3 show_entry_count_column">
                    {entryCount > 0 && renderShowingCount()}
                </div>
                <div className="col-12 col-sm-6 col-md-7 pl-3 pr-sm-0 pr-md-3">
                    {maxPage > 1 && renderPagination()}
                </div>
            </div>
        </div>
    )
}

export default Paginationable
