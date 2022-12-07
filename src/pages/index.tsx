import type {NextPage} from 'next'
import React from "react";
import {useStateValue} from "../contexts/AuthProvider";
import {apiRoutes} from "../constants";
import {Avatar} from "@chakra-ui/react";

const Index: NextPage = () => {
    const [{authUser}, ] = useStateValue()

    return (
        <section className='max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl mx-auto space-y-8 py-8'>
            <h1 className='text-center text-5xl'>Bonjour,</h1>
            {authUser ? (
                <div className='border rounded-xl p-12 flex flex-col items-center justify-center space-y-4'>
                    <Avatar
                        size='2xl'
                        bgColor='blue.600'
                        className='bg-blue-500 text-white'
                        name={`${authUser.firstName.charAt(0)} ${authUser.lastName.charAt(0)}`}
                        src={`${authUser.avatarId ? apiRoutes.GET_AVATAR(authUser.avatarId) : ''}`}/>
                    <p className='text-3xl text-gray-700 text-center'>{`${authUser.firstName} ${authUser.lastName}`}</p>
                </div>
            ) : (
                <div className='border rounded-xl p-12 flex flex-col items-center justify-center space-y-4'>
                    <div className="w-32 h-32 bg-slate-300 rounded-full"/>
                    <div className="h-3 w-2/5 bg-slate-300 rounded-full"/>
                    <div className="h-3 w-1/5 bg-slate-300 rounded-full"/>
                </div>
            )}
        </section>
    )
}

export default Index