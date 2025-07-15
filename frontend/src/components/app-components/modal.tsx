import React from "react";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {

    return(
        <>
            <button className="absolute w-6 mt-5 ml-2 bg-gradient-to-b from-[#0095F7] to-[#0076D3] border-[#005DAB] rounded-full text-[18px] cursor-pointer" onClick={onClose}>
                X
            </button>
            {children}
        </>
    )
}