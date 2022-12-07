import React from "react";
import {Form, Formik} from "formik";
import {InputField} from "./InputField";
import * as yup from "yup";
import {Button} from "@chakra-ui/react";
import {UseMutateFunction} from "react-query";
import {ILoginCredentials, ILoginResponse} from "../types/account";

interface Props {
    isLoading: boolean
    signInMutation: UseMutateFunction<ILoginResponse, unknown, ILoginCredentials>
}

export const LoginForm: React.FC<Props> = ({signInMutation, isLoading}) => {
    const LoginSchema = yup.object().shape({
        email: yup.string().email("must be a valid email").required('champs requis'),
        password: yup.string().required('champs requis'),
    });

    return (
        <Formik
            validationSchema={LoginSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={async (values) => {
                signInMutation(values)
            }}>
            {() => (
                <Form className='space-y-3' autoComplete='off' noValidate>
                    <InputField
                        type='email'
                        autoComplete='off'
                        required
                        placeholder="user@domain.com"
                        name='email'/>
                    <InputField
                        type='password'
                        autoComplete='new-password'
                        required
                        placeholder="Mot de passe"
                        name='password'/>
                    <Button
                        className='ring-0'
                        w='100%'
                        isLoading={isLoading}
                        type='submit'
                        colorScheme='messenger'>
                        Se connecter
                    </Button>
                </Form>
            )}
        </Formik>
    )
}