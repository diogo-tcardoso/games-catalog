import React from "react";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <button className="absolute w-6 top-3 right-3 bg-gradient-to-b from-[#0095F7] to-[#0076D3] border border-[#005DAB] rounded-full text-[16px] cursor-pointer" onClick={onClose}>
                X
                </button>
                {children}
        </div>
    )
}