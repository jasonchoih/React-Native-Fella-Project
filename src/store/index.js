import { aTb, bTa } from "utils/wss";
import { store, persistor } from './data';
// import { asfetch } from 'utils/asfetch';
// 
const SEND = async(path, _data) => 
{
    const Auth = store.getState().auths || '';
    const wss = store.getState().models.wss || '';
    // 
    let __data = {..._data, path };
    const __tk = (Auth && Auth.__tk) || '';
    if(__tk) __data = {...__data, __tk };
    // 
    if(wss) {
      wss.onmessage = async(d) => {
        store.dispatch.models.SET({...await bTa(d.data, wss.ikey)});
      };
      // wss.onclose = async(e) => {
      //   console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      //   setTimeout(async() => {
      //     let { url, sign, key } = await asfetch();
      //     let _wss = new WebSocket('wss://'+url+'/w'+sign);
      //     _wss.ikey = key;
      //     _wss.binaryType = 'arraybuffer';
      //     store.dispatch.models.SET({
      //       wss: _wss
      //   })
      //   }, 1000);
      // };
      // 
      // wss.onerror = (err) => {
      //   console.error('Socket encountered error: ', err.message, 'Closing socket');
      //   wss.close();
      // };
    }
    if(wss&&wss.readyState==1) wss.send(await aTb(__data, wss.ikey));
}
// 
store.subscribe(() => {
  // console.log(store.getState());
});
// 
export {
  SEND,
  store,
  persistor
}