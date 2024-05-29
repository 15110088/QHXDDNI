export const LOADING = 'LOADING';
export const INIT_APP = 'INIT_APP';
export const GetKeyStore = (Host,KeyLogin, IVLogin,KeyApp,IVApp,KeyMaHoa,IVMaHoa,KeyTime,UserSde,PassSde,KeyNapTien,IVNapTien) => {
    return async (dispatch) => {
      dispatch({
        type: LOADING,
      });
      try {
     
        dispatch({

          type: INIT_APP,
          Host:Host,
          KeyLogin:KeyLogin,
          IVLogin:IVLogin,
          KeyApp:KeyApp,
          IVApp:IVApp,
          KeyMaHoa:KeyMaHoa,
          IVMaHoa:IVMaHoa,
          KeyTime:KeyTime,
          UserSde:UserSde,
          PassSde:PassSde,
          KeyNapTien:KeyNapTien,
          IVNapTien:IVNapTien
      
        });
      } catch (err) {
        throw err;
      }
    };
  };