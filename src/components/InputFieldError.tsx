import React from "react";

interface Props {
    errorMessage: string
}

export const InputFieldError: React.FC<Props> = ({errorMessage}) => {
    return (
        <p className='!font-normal text-red-500'>{errorMessage}</p>
    )
}
