import {NextPage} from "next";
import {TableActions, TableFooter, TableHeader, TableSkeleton} from "../../components";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {useGroups} from "../../hooks/group";

const GroupList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useGroups(ITEMS_PER_PAGE, currentPage)

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter un groupe'
                    url={`${appRoutes.ROUTE_GROUPS}/add`}
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
                                {data.groups.map(({name, groupId}) => (
                                    <Tr key={groupId} className='transition-all hover:bg-slate-100'>
                                        <Td className='!py-2.5'>{name}</Td>
                                        <Td isNumeric>
                                            <TableActions
                                                editUrl={`${appRoutes.ROUTE_GROUPS}/${groupId}/edit`}/>
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

export default GroupList
