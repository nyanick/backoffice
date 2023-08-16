import React from "react";
import {Td, Tfoot, Tr} from "@chakra-ui/react";
import {Paging} from "./Paging";
import {ITEMS_PER_PAGE} from "../constants";

interface Props {
    itemsCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
}

export const TableFooter: React.FC<Props> = ({itemsCount, currentPage, setCurrentPage}) => {
    return (
        <Tfoot>
            <Tr>
                <Td colSpan={9}>
                    <div className='py-1 ml-auto'>
                        <Paging
                            onPageChange={(event, value) => {
                                setCurrentPage(value - 1)
                            }}
                            page={currentPage}
                            count={itemsCount}
                            itemsPerPage={ITEMS_PER_PAGE}/>
                    </div>
                </Td>
            </Tr>
        </Tfoot>
    )
}
