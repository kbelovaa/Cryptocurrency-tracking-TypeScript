import React, { FC } from 'react';
import './ModalWindow.scss';

interface ModalWindowProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  content: React.ReactNode;
}

const ModalWindow: FC<ModalWindowProps> = ({ id, isOpen, setIsOpen, content }) => (
  <div id={id} className={isOpen ? 'modal active' : 'modal'}>
    <div className="modal__content">
      <div className="modal__close" onClick={() => setIsOpen(false)}></div>
      {content}
    </div>
  </div>
);

export default ModalWindow;
