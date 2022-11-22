import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'Store/reducers';
declare const useTypedSelector: TypedUseSelectorHook<RootState>;
export default useTypedSelector;
