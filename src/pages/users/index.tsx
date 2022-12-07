import {NextPage} from "next";
import {Avatar, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {apiRoutes, appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {TableSkeleton, TableFooter, TableActions} from "../../components";
import {useUsers} from "../../hooks/user";

const UserList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useUsers(ITEMS_PER_PAGE, currentPage, null)

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                {isLoading ? <TableSkeleton cols={3} isUser detailsEnabled/> : (
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
                                {data.users.map(({firstName, lastName, avatarId, email, phoneNumber, userId}, key) => (
                                    <Tr key={key} className='transition-all hover:bg-slate-100'>
                                        <Td>
                                            <Avatar
                                                size='sm'
                                                bgColor='blue.600'
                                                className='bg-blue-500 text-white'
                                                name={`${firstName.charAt(0)} ${lastName.charAt(0)}`}
                                                src={`${avatarId ? apiRoutes.GET_AVATAR(avatarId) : ''}`}/>
                                        </Td>
                                        <Td>{`${firstName} ${lastName}`}</Td>
                                        <Td>{email}</Td>
                                        <Td>{phoneNumber}</Td>
                                        <Td isNumeric>
                                            <TableActions
                                                detailsUrl={`${appRoutes.ROUTE_USERS}/${userId}`}
                                                editUrl={`${appRoutes.ROUTE_USERS}/${userId}/edit`}/>
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

export default UserList
