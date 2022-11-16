import React, { FC, useCallback } from 'react'
import { CreateModal, CloseModalButton } from './style'

interface Props{
    children?: React.ReactNode;
    show: boolean,
    onCloseModal: (e: any) => void;
    closeButton?: boolean;
}

const Modal: FC<Props> = ({ children, show, onCloseModal }) =>{
    const stopPropagation = useCallback( (e:any) => {
        e.stopPropagation();
    },[]);

    if(!show){
        return null;
    }
    
    return (
        <CreateModal onClick={onCloseModal}>
            <div onClick={stopPropagation}>
                <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
                {children}
            </div>
        </CreateModal>
    )
}

export default Modal