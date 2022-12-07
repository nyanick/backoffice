import React from "react";
import Link from "next/link";
import {ViewGridAddIcon} from "@heroicons/react/outline";
import {Form, Formik} from "formik";
import {Input} from "@chakra-ui/react";

interface Props {
    title: string
    url: string,
    disabled?: boolean
}

export const TableHeader: React.FC<Props> = ({title, url, disabled}) => {
    return (
        <div className='w-full flex justify-between items-center'>
            <Link href={url}>
                <a className='flex items-center space-x-2 rounded-lg text-black bg-yellow-500 hover:bg-yellow-400 hover:text-black transition-all py-2 px-4'>
                    <span className='font-medium'>{title}</span>
                    <ViewGridAddIcon className='w-5 h-5' />
                </a>
            </Link>
            <div className='max-w-xs w-full'>
                <Formik
                    initialValues={{query: ''}}
                    onSubmit={async () => {
                    }}>
                    {({handleSubmit, handleChange}) => (
                        <Form
                            method='post'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}>
                            <Input
                                disabled={disabled}
                                onChange={handleChange}
                                id='query'
                                autoComplete='off'
                                name='query'
                                w='100%'
                                size='sm'
                                variant="outline"
                                rounded={'md'}
                                placeholder="Rechercher par nom"/>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
