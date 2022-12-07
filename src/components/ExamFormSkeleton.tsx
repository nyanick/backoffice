import React from "react";

interface Props {}

export const ExamFormSkeleton: React.FC<Props> = ({}) => {
    return (
        <div className='animate-pulse'>
            <div className='space-y-5'>
                {[...Array(2)].map((_, i) => (
                    <div key={i}>
                        <div className="h-2 bg-slate-300 rounded col-span-2 w-1/3 mb-2"/>
                        <div className="h-8 bg-slate-300 rounded-lg"/>
                    </div>
                ))}
            </div>
        </div>
    )
}
