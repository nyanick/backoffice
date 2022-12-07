import {NextPage} from "next";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {TableActions, TableFooter, TableHeader, TableSkeleton} from "../../components";
import {useHospitals} from "../../hooks/hospital";

const HospitalList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useHospitals(ITEMS_PER_PAGE, currentPage)

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter un hôpital'
                    url={`${appRoutes.ROUTE_HOSPITALS}/add`}
                    disabled={isLoading}/>
                {isLoading ? <TableSkeleton cols={2}/> : (
                    <div className='w-full border-x border-t rounded-lg'>
                        <Table size="sm" colorScheme='linkedin'>
                            <Thead>
                                <Tr>
                                    <Th py={3}>Code</Th>
                                    <Th>Name</Th>
                                    <Th/>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.hospitals.map(
                                    ({shortCode, name, hospitalId}, key) => (
                                        <Tr key={key} className='transition-all hover:bg-slate-100'>
                                            <Td className='!py-2.5'>{shortCode}</Td>
                                            <Td>{name}</Td>
                                            <Td isNumeric>
                                                <TableActions
                                                    editUrl={`${appRoutes.ROUTE_HOSPITALS}/${hospitalId}/edit`}/>
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

export default HospitalList
