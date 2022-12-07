import React, {useEffect, useState} from "react";
import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useField} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerInputProps = {
    name: string
    label?: string,
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({label, ...props}) => {

    const [startDate, setStartDate] = useState(new Date());

    const [field, {error, touched}, {setValue}] = useField(props)

    useEffect(() => {
        setValue(startDate)
    }, [startDate])

    return (
        <FormControl isInvalid={!!error && touched}>
            {label ? <FormLabel
                className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                htmlFor={field.name}>
                {label}
            </FormLabel> : null}
            <DatePicker
                name={field.name}
                {...field}
                {...props}
                dateFormat="yyyy-MM-dd"
                id={field.name}
                customInput={<Input {...field} {...props} id={field.name}/>}
                selected={startDate}
                maxDate={new Date()}
                onChange={(date) => setStartDate(date)}/>
            {error && touched ? <p className='!font-normal text-red-500'>{error}</p> : null}
        </FormControl>
    )
}