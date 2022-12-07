import {NextPage} from "next";
import {Avatar, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {apiRoutes, appRoutes, ITEMS_PER_PAGE} from "../../constants";
import {TableActions, TableFooter, TableHeader, TableSkeleton} from "../../components";
import {useDoctors} from "../../hooks/doctor";

const DoctorList: NextPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useDoctors(ITEMS_PER_PAGE, currentPage)
    console.log(data);
    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <TableHeader
                    title='Ajouter un médecin'
                    url={`${appRoutes.ROUTE_DOCTORS}/add`}
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
                                    <Th>Spécialité</Th>
                                    <Th/>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.doctors.map(({firstName, lastName, email, phoneNumber, userId, avatarId, title}, key) => (
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
                                        <Td className='max-w-[10rem]'>
                                            <p className='line-clamp-1'>{title}</p>
                                        </Td>
                                        <Td isNumeric>
                                            <TableActions
                                                detailsUrl={`${appRoutes.ROUTE_DOCTORS}/${userId}`}
                                                editUrl={`${appRoutes.ROUTE_DOCTORS}/${userId}/edit`}/>
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

export default DoctorList
