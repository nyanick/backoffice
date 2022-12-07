import {NextPage} from "next";
import {Avatar, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {apiRoutes, appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {TableActions, TableFooter, TableHeader, TableSkeleton} from "../../components";
import {usePatients} from "../../hooks/patient";

const PatientList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = usePatients(ITEMS_PER_PAGE, currentPage)
    console.log(data);

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter un patient'
                    url={`${appRoutes.ROUTE_PATIENTS}/add`}
                    disabled={isLoading}/>
                {isLoading ? <TableSkeleton cols={7} isUser detailsEnabled/> : (
                    <div className='w-full border-x border-t rounded-lg'>
                        <Table size="sm" colorScheme='linkedin'>
                            <Thead>
                                <Tr>
                                    <Th/>
                                    <Th py={3}>ID</Th>
                                    <Th>Noms</Th>
                                    <Th>Email</Th>
                                    <Th>Téléphone</Th>
                                    <Th>Sexe</Th>
                                    <Th>Groupe Sanguin</Th>
                                    <Th>Rhesus</Th>
                                    <Th/>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.patients.map(
                                    ({firstName, lastName, email, phoneNumber,gender, bloodGroup,rhesusFactor, userId, avatarId, patientId}, key) => (
                                        <Tr key={key} className='transition-all hover:bg-slate-100'>
                                            <Td>
                                                <Avatar
                                                    size='sm'
                                                    bgColor='blue.600'
                                                    className='bg-blue-500 text-white'
                                                    name={`${firstName.charAt(0)} ${lastName.charAt(0)}`}
                                                    src={`${avatarId ? apiRoutes.GET_AVATAR(avatarId) : ''}`}/>
                                            </Td>
                                            <Td>{patientId}</Td>
                                            <Td>{`${firstName} ${lastName}`}</Td>
                                            <Td>{email}</Td>
                                            <Td>{phoneNumber}</Td>
                                            <Td>{gender}</Td>
                                            <Td>{bloodGroup}</Td>
                                            <Td>{rhesusFactor}</Td>
                                            <Td isNumeric>
                                                <TableActions
                                                    detailsUrl={`${appRoutes.ROUTE_PATIENTS}/${userId}`}
                                                    editUrl={`${appRoutes.ROUTE_PATIENTS}/${userId}/edit`}/>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                            <TableFooter
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                itemsCount={data?.itemsCount}>
                            </TableFooter>
                        </Table>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PatientList
