import React, { FC } from 'react';
import './ModalWindow.scss';
interface ModalWindowProps {
    id: string;
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    content: React.ReactNode;
}
declare const ModalWindow: FC<ModalWindowProps>;
export default ModalWindow;
