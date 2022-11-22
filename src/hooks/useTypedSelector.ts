import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'Store/reducers';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
