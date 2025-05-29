import Image from "next/image";
import React from "react";

interface HeaderProps {
    className?: string;
    children?: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
    return (
        <>
            <header className={className}>
                <div className="bg-[#135266] flex items-center justify-around mb-7">
                    <div className="flex justify-center">
                        <Image src="/logo.png" alt="Logo" width={250} height={250} className="mb-4" />
                    </div>
                    <div className="flex justify-center mb-4">
                        {children}
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;