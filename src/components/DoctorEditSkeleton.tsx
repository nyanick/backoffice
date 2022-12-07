import React from "react";

interface Props {
}

export const DoctorEditSkeleton: React.FC<Props> = ({}) => {
    return (
        <div className='animate-pulse'>
            <div className='w-full flex justify-center items-center'>
                <div className='bg-slate-300 my-10 w-40 h-40 rounded-xl'>
                </div>
            </div>
            <div className="flex space-x-4 py-2">
                <div className='flex-1 space-y-6'>
                    {[...Array(8)].map((_, i) => (
                        <div key={i}>
                            <div className="h-2 bg-slate-300 rounded col-span-2 w-1/3 mb-2"/>
                            <div className="h-8 bg-slate-300 rounded-lg"/>
                        </div>
                    ))}
                </div>
                <div className='flex-1 space-y-6'>
                    {[...Array(8)].map((_, i) => (
                        <div key={i}>
                            <div className="h-2 bg-slate-300 rounded col-span-2 w-1/3 mb-2"/>
                            <div className="h-8 bg-slate-300 rounded-lg"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
