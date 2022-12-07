import React, {ButtonHTMLAttributes} from "react";
import {ImSpinner8} from "react-icons/im";

export type Variant = 'outline' | 'fill'

type ButtonFieldProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string
    variant: Variant
    callback?: () => void
    processing?: boolean
}

export const Button: React.FC<ButtonFieldProps> = ({processing, text, variant, callback, ...props}) => {
    return (
        <button
            onClick={callback}
            {...props}
            className={`transition-all font-semibold hover:shadow-sm text-sm flex justify-center items-center rounded-lg px-4 py-2 ${variant === 'fill' ?
                'relative bg-blue-600 hover:bg-violet-500 text-white active:ring-1 active:ring-gray-600 active:bg-white active:!text-gray-800' :
                'hover:bg-neutral-100 text-gray-600 hover:text-gray-800 ring-1 ring-gray-400 hover:ring-gray-600'}`}>
            <span className={processing ? 'invisible' : ''}>{text}</span>
            {processing && <ImSpinner8 className='animate-spin w-6 h-6 absolute'/>}
        </button>
    )
}
