import {ComponentWithAs, FormControl, Input, Textarea} from "@chakra-ui/react";
import React, {InputHTMLAttributes} from "react";
import {useField} from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label?: string,
    textarea?: boolean,
    rows?: number
}

export const InputField: React.FC<InputFieldProps> = ({label, textarea, size, ...props}) => {
    let InputOrTextarea: ComponentWithAs<'input'> = Input
    if (textarea) {
        InputOrTextarea = Textarea
    }

    const [field, {error, touched}] = useField(props)

    return (
        <FormControl mb={0} isInvalid={!!(error && touched)}>
            {label ? <label
                className={`text-sm mb-1 !font-normal text-gray-600 ${props.required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500 after:inline-block' : ''}`}
                htmlFor={field.name}>
                {label}
            </label> : null}
            <InputOrTextarea {...field} {...props} id={field.name}/>
            {error && touched ? <p className='!font-normal text-red-500'>{error}</p> : null}
        </FormControl>
    )
}