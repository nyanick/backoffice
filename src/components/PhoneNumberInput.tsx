import React from "react";
import {FormControl, FormLabel} from "@chakra-ui/react";
import {useField} from "formik";
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

type PhoneNumberInputProps = {
    label: string,
    required?: boolean
    name: string
    setDialCode: (dialCode: string) => void
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({label, required, name, setDialCode, ...props}) => {
    const [field, meta, helpers] = useField({
        ...props,
        name
    })

    const {error, touched} = meta
    const {setValue} = helpers

    return (
        <FormControl isInvalid={!!error && touched}>
            {label ? <FormLabel
                className={`text-sm mb-1 !font-normal text-gray-600 ${required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500 after:inline-block' : ''}`}
                htmlFor={field.name}>
                {label}
            </FormLabel> : null}
            <ReactPhoneInput
                {...field}
                {...props}
                country='cm'
                placeholder=''
                containerClass='flex '
                countryCodeEditable={false}
                inputClass={`flex-1 !h-auto ${error && touched ? '!border-2 !border-red-500 !rounded-lg' : ''}`}
                buttonClass={error && touched ? '!border-2 !border-red-500 !rounded-l-lg !px-0.5' : ''}
                inputProps={{
                    name: field.name,
                    id: field.name,
                    required: true,
                    autoFocus: true
                }}
                onBlur={(event, data: any) => {
                    setValue(event.target.value.replace(/\s/g, ''))
                    setDialCode(`+${data.dialCode}`)
                }}
                onChange={(_, data: any, __, formattedValue) => {
                    setValue(formattedValue.replace(/\s/g, ''))
                    setDialCode(`+${data.dialCode}`)
                }}
            />
            {error && touched ? <p className='!font-normal text-red-500'>{error}</p> : null}
        </FormControl>
    )
}