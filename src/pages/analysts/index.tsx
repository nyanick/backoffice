import {NextPage} from "next";
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Input,
    Link,
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {apiRoutes, appRoutes} from "../../constants";
import {GrUserAdd} from "react-icons/gr";
import {Form, Formik} from "formik";
import {CgOptions} from "react-icons/cg";
import {Paging} from "../../components/Paging";
import {useStateValue} from "../../contexts/AuthProvider";
import axios from "../../api/axios";

const AnalystList: NextPage = () => {
    const [analystsCount, setAnalystsCount] = useState(0);
    const [analysts, setAnalysts] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [{authToken}] = useStateValue();
    const ITEMS_PER_PAGE = 10

    useEffect(() => {
        loadAnalysts(currentPage)
    }, [currentPage]);

    const loadAnalysts = (currentPage: number) => {
        const params = {
            size: ITEMS_PER_PAGE,
            page: currentPage,
            Authorization: `Bearer ${authToken}`
        };
        axios.get(apiRoutes.GET_ANALYSTS, {params: params})
            .then(res => {
                setAnalysts(res.data)
                setAnalystsCount(res.headers['x-total-count']);
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <>
            <Head>
                <title>Laborantins</title>
                <meta name="description" content="Laborantins"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
                <meta property="og:title" content="Laborantins" />
                <meta property="og:description" content="Laborantins" />
                <meta property="og:url" content="https://www.nucleusbiotechlabs.com/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section>
                <VStack w='100%' spacing={8} px={8} py={4}>
                    <div className='w-full flex justify-between items-center'>
                        <Link _hover={{textDecoration: 'none'}} href={appRoutes.ROUTE_ADD_ANALYST}>
                            <ButtonGroup size="md" isAttached colorScheme='yellow' variant="solid">
                                <Button mr="-px">Nouveau Laborantin</Button>
                                <IconButton aria-label="Add to analyst" icon={<GrUserAdd/>}/>
                            </ButtonGroup>
                        </Link>
                        <Box maxW='300px' w='100%'>
                            <Formik
                                initialValues={{query: ''}}
                                onSubmit={async (values) => {
                                }}>
                                {({isSubmitting, handleSubmit, handleChange}) => (
                                    <Form
                                        method='post'
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSubmit();
                                            }
                                        }}>
                                        <Input
                                            onChange={handleChange}
                                            id='query'
                                            autoComplete='off'
                                            name='query'
                                            w='100%'
                                            size='sm'
                                            variant="outline"
                                            rounded={'md'}
                                            placeholder="Rechercher par ID, Nom"/>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </div>

                    <Box
                        w='100%'
                        borderWidth={'1px'}
                        borderColor={'gray.200'}
                        borderRadius={'lg'}>
                        <Table size="sm" colorScheme='linkedin' variant='striped'>
                            <Thead>
                                <Tr>
                                    <Th></Th>
                                    <Th py={3}>NOM(S)</Th>
                                    <Th>Email</Th>
                                    <Th>Téléphone</Th>
                                    <Th isNumeric></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {analysts?.map((analyst, key) => (
                                    <Tr key={key}>
                                        <Td>
                                            <Avatar
                                                size='sm'
                                                bgColor='blue.600'
                                                className='bg-blue-500 text-white'
                                                name={`${analyst.firstName.substr(" ")[0]} ${analyst.lastName.substr(" ")[0]}`}
                                                src={`${analyst.avatarId ? apiRoutes.GET_AVATAR(analyst.avatarId) : ''}`}/>
                                        </Td>
                                        <Td>{`${analyst.firstName} ${analyst.lastName}`}</Td>
                                        <Td>{analyst.email}</Td>
                                        <Td>{analyst.phoneNumber}</Td>
                                        <Td>{analyst.specialityLabel}</Td>
                                        <Td isNumeric>
                                            <IconButton variant='solid' colorScheme='teal' size='sm' aria-label='options'>
                                                <CgOptions/>
                                            </IconButton>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Td colSpan={6}>
                                        <div className='py-1 ml-auto'>
                                            <Paging
                                                onPageChange={(event, value) => {
                                                    setCurrentPage(value - 1)
                                                }}
                                                page={currentPage}
                                                count={analystsCount}
                                                itemsPerPage={ITEMS_PER_PAGE}/>
                                        </div>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </Box>
                </VStack>
            </section>
        </>
    )
}

export default AnalystList
