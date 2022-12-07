import React from "react";
import {Button} from "./Button";

interface Props {
    updateMode?: boolean
    processing: boolean
    createMode: string
    setCreateMode: (string) => void
    onCancel: () => void
}

export const FormFooterButtons: React.FC<Props> = ({updateMode, processing, createMode, setCreateMode, onCancel}) => {
    return (
        <div className='w-full mt-8 space-x-4 w-full flex justify-between items-center'>
            <Button text='Annuler' type='button' variant='outline' callback={onCancel}/>
            <div className='space-x-4 flex items-center'>
                <Button
                    callback={() => {
                        setCreateMode('single')
                    }}
                    type='submit'
                    text='Sauvegarder'
                    variant='fill'
                    processing={createMode === 'single' && processing}/>
                {!updateMode && (
                    <Button
                        callback={() => {
                            setCreateMode('multiple')
                        }}
                        type='submit'
                        text='Sauvegarder & Continuer'
                        variant='fill'
                        processing={createMode === 'multiple' && processing}/>
                )}
            </div>
        </div>
    )
}
