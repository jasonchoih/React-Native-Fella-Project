const aTb = async(arr, _key) => 
{
  let b = '';
  const _kl = _key.length;
  try {
      let str = JSON.stringify(arr);
      let _arr = [];
      for (var i = 0; i < str.length; i++) {
          _arr.push(str.charCodeAt(i) ^ _key[i & _kl]);
      }
      b = new Uint16Array(_arr);
  } catch (e) {

  }
  return b;
}
// 
const bTa = async(buf, _key) => 
{
  let a = [];
  const _kl = _key.length;
  try {
      buf = new Uint16Array(buf);
      for (let i = 0; i < buf.length; i++) {
          a[i] = buf[i];
          a[i] ^= _key[i & _kl];
      }
      a = JSON.parse(String.fromCharCode.apply(null, a));
  } catch (e) {

  }
  return a
}
// 
export{
    aTb,
    bTa
}