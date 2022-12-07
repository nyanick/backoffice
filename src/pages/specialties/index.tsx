import {NextPage} from "next";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {TableActions, TableFooter, TableHeader, TableSkeleton} from "../../components";
import {useSpecialties} from "../../hooks/specialty";

const SpecialtyList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useSpecialties(ITEMS_PER_PAGE, currentPage)

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter une spécialité'
                    url={`${appRoutes.ROUTE_SPECIALTIES}/add`}
                    disabled={isLoading}/>
                {isLoading ? <TableSkeleton cols={2}/> : (
                    <div className='w-full border-x border-t rounded-lg'>
                        <Table size="sm" colorScheme='linkedin'>
                            <Thead>
                                <Tr>
                                    <Th py={3}>Name</Th>
                                    <Th>Description</Th>
                                    <Th/>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.specialties.map(
                                    ({label, description, specialtyId}, key) => (
                                        <Tr key={key} className='transition-all hover:bg-slate-100'>
                                            <Td className='!py-2.5'>{label}</Td>
                                            <Td>{description}</Td>
                                            <Td isNumeric>
                                                <TableActions
                                                    editUrl={`${appRoutes.ROUTE_SPECIALTIES}/${specialtyId}/edit`}/>
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

export default SpecialtyList
