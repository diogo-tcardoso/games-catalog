import React from "react";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {

    return(
        <>
            <button onClick={onClose}>
                X
            </button>
            {children}
        </>
    )
}