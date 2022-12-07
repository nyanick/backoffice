import React, {InputHTMLAttributes} from "react";
import {FormControl, FormErrorMessage, FormLabel, Select} from "@chakra-ui/react";
import {useField} from "formik";
import {SelectFieldProps} from "@chakra-ui/select";

type CountrySelectInputProps = InputHTMLAttributes<HTMLInputElement> & SelectFieldProps & {
    name: string
    label?: string,
    options: any[],
    placeholder?: string
}

export const CountrySelectInput: React.FC<CountrySelectInputProps> = ({label, placeholder, options, size, ...props}) => {
    const [field, {error}] = useField(props)
    return (
        <FormControl isInvalid={!!error}>
            {label ? <FormLabel
                style={{fontWeight: 'normal'}}
                className='text-sm mb-1 text-gray-600'
                htmlFor={field.name}>
                {label}
            </FormLabel> : null}
            <Select name={field.name} {...field} {...props} id={field.name} placeholder={placeholder}>
                {options.map((option, key) => (
                    <option key={key}>{option}</option>
                ))}
            </Select>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}