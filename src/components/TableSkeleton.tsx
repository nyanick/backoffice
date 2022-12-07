import React from "react";

interface Props {
    cols: number,
    isUser?: boolean
    detailsEnabled?: boolean
}

export const TableSkeleton: React.FC<Props> = ({cols, isUser, detailsEnabled}) => {
    return (
        <div className='animate-pulse'>
            <div className='rounded-lg border'>
                <div className="flex items-center space-x-16 p-3">
                    <div className='flex-1 flex space-x-4 items-center'>
                        {isUser && <div className='w-8'/>}
                        {[...Array(cols)].map((_, i) => (
                            <div key={i} className='flex-1 h-5 bg-slate-300 rounded-lg' />
                        ))}
                    </div>
                    <div className={`w-1/6 ${detailsEnabled ? 'w-1/6' : 'w-1/12'}`}/>
                </div>
                {[...Array(10)].map((_, i) => (
                    <div key={i}
                         className={`flex items-center space-x-16 border-t px-3 ${isUser ? 'py-1.5' : 'py-2.5'}`}>
                        <div className='flex-1 flex items-center space-x-4'>
                            {isUser && <div className='w-8 h-8 bg-slate-300 rounded-full'/>}
                            {[...Array(cols)].map((_, i) => (
                                <div key={i} className='flex-1 h-4 bg-slate-300 rounded-lg'/>
                            ))}
                        </div>
                        <div className={`flex ${detailsEnabled ? 'w-1/6' : 'w-1/12'} items-center space-x-4`}>
                            {detailsEnabled && <div className="flex-1 h-3 bg-slate-300 rounded-lg"/>}
                            <div className="flex-1 h-3 bg-slate-300 rounded-lg"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
