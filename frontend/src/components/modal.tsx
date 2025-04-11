import React from "react";
import { ModalStyle, ModalOverlay, CloseButton } from "../styles/components-styles/modal-styles";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <ModalOverlay>
            <ModalStyle>
                <CloseButton onClick={onClose}>
                    X
                </CloseButton>
                {children}
            </ModalStyle>
        </ModalOverlay>
    );
}