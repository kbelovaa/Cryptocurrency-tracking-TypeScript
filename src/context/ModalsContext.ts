import { createContext } from 'react';
import { IModalsContext } from 'Types/modals';

const ModalsContext = createContext<IModalsContext | null>(null);

export default ModalsContext;
