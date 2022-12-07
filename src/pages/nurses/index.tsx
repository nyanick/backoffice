import {NextPage} from "next";
import {Avatar, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {apiRoutes, appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {TableActions, TableFooter, TableHeader, TableSkeleton} from "../../components";
import {useGetNurses} from "../../hooks/nurse";

const NurseList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useGetNurses(ITEMS_PER_PAGE, currentPage)

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter un infirmier'
                    url={`${appRoutes.ROUTE_NURSES}/add`}
                    disabled={isLoading}/>
                {isLoading ? <TableSkeleton cols={4} isUser detailsEnabled/> : (
                    <div className='w-full border-x border-t rounded-lg'>
                        <Table size="sm" colorScheme='linkedin'>
                            <Thead>
                                <Tr>
                                    <Th/>
                                    <Th py={3}>Noms</Th>
                                    <Th>Email</Th>
                                    <Th>Téléphone</Th>
                                    <Th/>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.nurses.map(({firstName, lastName, email, phoneNumber, userId, avatarId}, key) => (
                                    <Tr key={key} className='transition-all hover:bg-slate-100'>
                                        <Td>
                                            <Avatar
                                                size='sm'
                                                bgColor='blue.100'
                                                className='bg-blue-500 text-white'
                                                name={`${firstName.charAt(0)} ${lastName.charAt(0)}`}
                                                src={`${avatarId ? apiRoutes.GET_AVATAR(avatarId) : ''}`}/>
                                        </Td>
                                        <Td>{`${firstName} ${lastName}`}</Td>
                                        <Td>{email}</Td>
                                        <Td>{phoneNumber}</Td>
                                        <Td isNumeric>
                                            <TableActions
                                                detailsUrl={`${appRoutes.ROUTE_NURSES}/${userId}`}
                                                editUrl={`${appRoutes.ROUTE_NURSES}/${userId}/edit`}/>
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

export default NurseList
