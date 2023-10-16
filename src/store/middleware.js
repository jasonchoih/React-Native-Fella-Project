export default (store) => (next) => (action) =>
{
    // 
    // if (action.payload&&action.payload.Auth&&action.payload.Auth){
    //     dispatch.auths.AUT({ ...Auth });
    // }
    console.log('hhh', store.getState());
    // console.log(store.getState())
    //
    //   useEffect(() => {
    //     if(!AuthDel) return;
    //     store.dispatch.auths.DEL();
    //   }, [AuthDel]);
    //   // 
    //   useEffect(() => {
    //     if(!A||!A.u) return;
    //     // navigation.navigate('/'+A.u);
    //     store.dispatch.models.SET({A:''})
    //   }, [A]);
    // console.log("action hello", action);
    next(action);
};