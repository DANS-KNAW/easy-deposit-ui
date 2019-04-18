import * as React from "react"
import { useState } from "react"
import { range } from "lodash"
import "../../resources/css/paginationable.css"

interface PaginationableProps<T> {
    pagesShown: number
    entries: T[]
    renderEntries: (entries: T[], entryCount: number) => any
}

function Paginationable<T>({pagesShown, entries, renderEntries}: PaginationableProps<T>) {
    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const [depositsPerPage, setDepositsPerPage] = useState(10)

    const entriesToBeRendered = entries.slice(currentStartIndex, currentStartIndex + depositsPerPage) // end index is exclusive
    const entryCount = entries.length
    const hasNextPage = currentStartIndex + depositsPerPage < entryCount
    const hasPreviousPage = currentStartIndex - depositsPerPage >= 0
    const maxPage = Math.ceil(entryCount / depositsPerPage)
    const currentPage = currentStartIndex / depositsPerPage

    const nextPage = () => hasNextPage && setCurrentStartIndex(currentStartIndex + depositsPerPage)
    const previousPage = () => hasPreviousPage && setCurrentStartIndex(currentStartIndex - depositsPerPage)
    const gotoPage = (n: number) => depositsPerPage * n < entryCount && setCurrentStartIndex(depositsPerPage * n)
    const showPages: () => number[] = () => {
        const halfPS = Math.floor(pagesShown / 2)
        const [start, end] = 0 <= currentPage && currentPage <= halfPS
            ? [0, Math.min(maxPage, pagesShown)]
            : maxPage - 1 - halfPS <= currentPage && currentPage <= maxPage
                ? [maxPage - pagesShown, maxPage]
                : [currentPage - halfPS, currentPage + halfPS + 1]

        return range(start, end, 1)
    }

    const renderShowEntriesDropdown = () => (
        <label className="mb-2">
            {"Show "}
            <select value={depositsPerPage} onChange={event => setDepositsPerPage(Number(event.target.value))}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
            </select>
            {" entries"}
        </label>
    )

    const renderPagination = () => (
        <nav>
            <ul className="pagination mb-0">
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
                    {`Showing ${currentStartIndex + 1} to ${Math.min(entryCount, currentStartIndex + depositsPerPage)} of ${entryCount} deposits`}
                </div>
                <div className="col-12 col-sm-6 col-md-7 pl-3 pr-sm-0 pr-md-3">
                    <div className="float-sm-right">
                        {maxPage > 1 && renderPagination()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paginationable
