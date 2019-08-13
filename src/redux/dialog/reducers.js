import { 
    DIALOG_OPEN,
    DIALOG_CLOSE,
} from "./actionTypes";

const INITIAL_STATE = {
    title: '',
    content: '',
    open: false, 
    closeText: 'Cancelar',
    closeHandle: () => {},
    submitText: 'OK',
    submitHandle: () => {},
    children: null,
}

export default function reducers(state = INITIAL_STATE, action) {
    
    switch (action.type) {
        
        case DIALOG_OPEN:
            return  {
                ...state,
                ...action.payload, 
                open:true
            }
        
        case DIALOG_CLOSE:
            return  {
                ...INITIAL_STATE
            }
         
        default: return state;
    }
};