import React from "react";
import Link from "next/link";

interface Props {
    detailsUrl?: string
    editUrl: string
}

export const TableActions: React.FC<Props> = ({detailsUrl, editUrl}) => {
    return (
        <div className="flex items-center space-x-2 justify-end">
            {detailsUrl && (
                <>
                    <Link href={detailsUrl}>
                        <a className='font-bold text-sky-600  transition-all'>Détails</a>
                    </Link>
                    <span className='w-0.5 bg-sky-400 h-4'/>
                </>
            )}
            <Link href={editUrl}>
                <a className='font-bold text-sky-600  transition-all'>Editer</a>
            </Link>
        </div>
    )
}