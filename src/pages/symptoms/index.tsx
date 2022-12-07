import {NextPage} from "next";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {TableActions, TableFooter, TableHeader, TableSkeleton} from "../../components";
import {useSymptoms} from "../../hooks/symptom";

const SymptomList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useSymptoms(ITEMS_PER_PAGE, currentPage)

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter un symptôme'
                    url={`${appRoutes.ROUTE_SYMPTOMS}/add`}
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
                                {data.symptoms.map(({name, symptomId}) => (
                                        <Tr key={symptomId} className='transition-all hover:bg-slate-100'>
                                            <Td className='!py-2.5'>{name}</Td>
                                            <Td isNumeric>
                                                <TableActions
                                                    editUrl={`${appRoutes.ROUTE_SYMPTOMS}/${symptomId}/edit`}/>
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

export default SymptomList
