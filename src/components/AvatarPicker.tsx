import {useField} from "formik";
import React, {InputHTMLAttributes, useEffect, useRef} from "react";
import {useState} from "react";
import {apiRoutes} from "../constants";
import Image from "next/image";
import {CameraIcon} from "@heroicons/react/outline";
import {InputFieldError} from ".";

type AvatarPickerProps = InputHTMLAttributes<HTMLInputElement> & {
    avatarId?: string
    placeholder?: string
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({avatarId, placeholder, ...props}) => {
    const p: any = props
    const [field, {error, touched}, {setValue}] = useField({
        ...props,
        name: p.field.name
    })
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState(null);
    const avatarRef = useRef(null)

    const handleAvatarChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result)
            };
            reader.readAsDataURL(file);
            setValue(file);
        }
    }

    useEffect(() => {
        if (imagePreviewUrl) {
            setAvatarSrc(imagePreviewUrl)
        } else {
            if (avatarId) {
                setAvatarSrc(apiRoutes.GET_AVATAR(avatarId))
            } else if (!placeholder) {
                setAvatarSrc('/assets/avatar.png')
            }
        }
    }, [imagePreviewUrl, avatarId, placeholder])

    return (
        <div>
            <div
                onClick={() => avatarRef.current.click()}
                className='group mt-2 w-40 h-40 flex justify-center items-center hover:border-2 transition-all relative border border-blue-500 p-0.5 rounded-xl'>
                {avatarSrc ? (
                    <Image
                        layout='fill'
                        alt='Avatar'
                        className='transition-all object-cover rounded-xl cursor-pointer select-none filter group-hover:opacity-70'
                        src={avatarSrc}/>
                ) : (
                    <div className='bg-blue-500 flex justify-center items-center w-full h-full rounded-xl'>
                        <span className='text-white text-4xl font-semibold'>{placeholder}</span>
                    </div>
                )}
                <div
                    className='cursor-pointer opacity-80 absolute transition-all hidden group-hover:inline-flex flex justify-center items-center rounded-lg bg-gray-500 h-10 w-10'>
                    <CameraIcon className='w-8 h-8 text-gray-200'/>
                </div>
            </div>
            {error && touched ? <InputFieldError errorMessage={error}/> : null}
            <div className='hidden'>
                <input
                    onChange={handleAvatarChange}
                    ref={avatarRef}
                    type='file'
                    {...props}
                    id={field.name}
                    name={field.name}/>
            </div>
        </div>
    )
}