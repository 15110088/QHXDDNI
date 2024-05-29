
import { INIT_APP,LOADING } from './sdeAction';


const initialState = {
    Host:'',
    KeyLogin:'',
    IVLogin:'',
    KeyApp:'',
    IVApp:'',
    KeyMaHoa:'',
    IVMaHoa:'',
    KeyTime:'',
    UserSDE:'',
    PassSDE:'',
    KeyNapTien:'',
    IVNapTien:''

  };

export const sdeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
              ...state,
              isLoading: true,
              // error: false,
            };
          }
          case INIT_APP: 
            return {
              Host:action.Host,
              KeyLogin:action.KeyLogin,
              IVLogin:action.IVLogin,
              KeyApp:action.KeyApp,
              IVApp:action.IVApp,
              KeyMaHoa:action.KeyMaHoa,
              IVMaHoa:action.IVMaHoa,
              KeyTime:action.KeyTime,
              KeyNapTien:action.KeyNapTien,
              IVNapTien:action.IVNapTien,
              UserSDE:action.UserSde,
              PassSDE:action.PassSde
            };
        default:
            return state;        
    }
  
  
}

 
