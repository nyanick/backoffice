import React from "react";
import {NextPage} from "next";
import Head from 'next/head'
import {useRouter} from "next/router";
import {Form, Formik} from "formik";
import {Box, Button, Divider, Flex, Text, VStack} from "@chakra-ui/react";
import countryList from 'react-select-country-list'
import {useStateValue} from "../../contexts/AuthProvider";
import axios from "../../api/axios";
import {apiRoutes, appRoutes} from "../../constants";
import {InputField} from "../../components";
import {DatePickerInput} from "../../components/DatePickerInput";
import {CountrySelectInput} from "../../components/CountrySelectInput";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";
import moment from "moment";

const AnalystCreate: NextPage = () => {
    const [{authToken}] = useStateValue();
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Nouveau Laborantin</title>
                <meta name="description" content="Nouveau Laborantin"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
                <meta property="og:title" content="Nouveau Laborantin" />
                <meta property="og:description" content="Nouveau Laborantin" />
                <meta property="og:url" content="https://www.nucleusbiotechlabs.com/" />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section>
                <Text px={10} mt={6} className='text-2xl font-medium'>Ajouter un laborantin</Text>
                <Formik
                    initialValues={{
                        title:'',
                        firstName: '',
                        lastName: '',
                        bornOn: '',
                        placeOfBirth: '',
                        nationality: '',
                        email: '',
                        phoneNumber: '',
                        country: '',
                        address: '',
                        city: '',
                    }} onSubmit={async (values) => {
                    const data = {
                        ...values,
                        bornOn: moment(values.bornOn).format("yyyy-MM-DD")
                    }
                    axios.post(apiRoutes.ADD_ANALYST, data, {
                        headers: {'Authorization': `Bearer ${authToken}`}
                    })
                        .then((_) => {
                            router.push(appRoutes.ROUTE_ANALYSTS)
                        })
                        .catch(err => {
                            console.log('Error occurred -> ', err)
                        });
                }}>
                    {({isSubmitting}) => (
                        <Form autoComplete='off'>
                            <Box w='100%' py={8} px={10}>
                                <Box
                                    borderWidth={'1px'}
                                    borderColor={'gray.200'}
                                    borderRadius={'md'}
                                    p={[4, 4, 8, 8]}
                                    width={'100%'}
                                    mx={'auto'}>

                                    <Flex direction={['column', 'column', 'row', 'row']}  /*spacing={[4, 4, 8, 8]}*/ >
                                        <VStack spacing={4} flex={1}>
                                            <InputField
                                                required
                                                name='title'
                                                placeholder='Title'
                                                label='Title'
                                            />
                                            <InputField
                                                required
                                                name='firstName'
                                                placeholder='prénoms'
                                                label='Prénoms'
                                            />
                                            <InputField
                                                required
                                                name='lastName'
                                                placeholder='noms'
                                                label='Noms'
                                            />
                                            <InputField
                                                required
                                                name='placeOfBirth'
                                                placeholder='lieu de naissance'
                                                label='Lieu de naissance'
                                            />
                                            <DatePickerInput
                                                label='Date de naissance'
                                                name='bornOn'/>
                                            <CountrySelectInput
                                                options={countryList().getLabels()}
                                                required
                                                label='Nationalité'
                                                name='nationality'
                                                placeholder='Sélectionner la nationalité'/>
                                            <InputField
                                                type={'email'}
                                                required
                                                label='Adresse email'
                                                name='email'
                                                placeholder='adresse email'
                                            />
                                        </VStack>
                                        <Divider display={['none', 'none', 'initial', 'initial']}
                                                 alignSelf={'center'}
                                                 bg={'blue'} color={'linkedin.600'} mx={8}
                                                 orientation={'vertical'}
                                                 height={'400px'}/>
                                        <VStack direction={'column'} mt={[4, 4, 0, 0]} spacing={4} flex={1}>
                                            <PhoneNumberInput
                                                setDialCode={dialCode => {}}
                                                label='Téléphone'
                                                name='phoneNumber'
                                            />
                                            <CountrySelectInput
                                                options={countryList().getLabels()}
                                                required
                                                label='Pays de résidence'
                                                placeholder='Sélectionner un pays'
                                                name='country'/>
                                            <InputField
                                                type={'text'}
                                                required
                                                label='Ville de résidence'
                                                name='city'
                                                placeholder='ville de résidence'
                                            />
                                            <InputField
                                                type={'text'}
                                                required
                                                label='Adresse'
                                                name='address'
                                                placeholder='adresse'
                                            />
                                            <InputField
                                                textarea
                                                required
                                                label='Biography'
                                                name='biography'
                                                placeholder='biography'
                                            />
                                        </VStack>
                                    </Flex>
                                </Box>

                                <div className='w-full mt-8 space-x-4 w-full flex justify-end items-center'>
                                    <Button
                                        style={{width: '240px'}}
                                        variant='outline'
                                        className='ring-0'
                                        colorScheme='blackAlpha'>
                                        Annuler
                                    </Button>
                                    <Button
                                        style={{width: '240px'}}
                                        className='ring-0'
                                        isLoading={isSubmitting}
                                        type='submit'
                                        colorScheme='messenger'>
                                        Ajouter
                                    </Button>
                                </div>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    )
}

export default AnalystCreate