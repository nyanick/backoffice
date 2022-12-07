import {NextPage} from "next";
import {TableSkeleton, TableActions, TableHeader, TableFooter} from "../../components";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {useCategories} from "../../hooks/category";

const CategoryList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useCategories(ITEMS_PER_PAGE, currentPage)

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter une catégorie'
                    url={`${appRoutes.ROUTE_CATEGORIES}/add`}
                    disabled={isLoading}/>
                {isLoading ? <TableSkeleton cols={1}/> : (
                    <div className='w-full border-x border-t rounded-lg'>
                        <Table size="sm" colorScheme='linkedin'>
                            <Thead>
                                <Tr>
                                    <Th py={3}>Nom</Th>
                                    <Th/>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.categories.map(({categoryId, name}) => (
                                    <Tr key={categoryId} className='transition-all hover:bg-slate-100'>
                                        <Td className='!py-2.5'>{name}</Td>
                                        <Td isNumeric>
                                            <TableActions editUrl={`${appRoutes.ROUTE_CATEGORIES}/${categoryId}/edit`}/>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <TableFooter
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                itemsCount={data.itemsCount}/>
                        </Table>
                    </div>
                )}
            </div>
        </section>
    )
}

export default CategoryList
