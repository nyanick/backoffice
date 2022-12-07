import React, {forwardRef} from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
    textarea?: boolean;
    rows?: number;
    error?: string;
    transparent?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className, textarea, error, transparent, ...props}, ref) => {
        const bg = transparent ? `bg-transparent` : `bg-blue-100`;
        const ring = error ? `ring-1 ring-blue-500` : "";
        const cn = `w-full py-2 px-4 rounded-sm text-gray-800 placeholder-blue-300 focus:outline-none ${bg} ${ring} ${className} `;

        return textarea ? (
            <textarea
                ref={ref as any}
                className={cn}
                data-testid="textarea"
                {...(props as any)}
            />
        ) : (
            <input ref={ref} className={cn} data-testid="input" {...props} />
        );
    }
);

Input.displayName = "Input";