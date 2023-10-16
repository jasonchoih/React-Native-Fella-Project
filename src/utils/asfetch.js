export async function asfetch(){
    let _r = {};
    try {
        let _g = await fetch('https://nt.bgrnow.com/gets').then(res => res.text());
        let _gg = _g.split('-');
        _r = {
            url:  _gg[0],
            sign: _gg[1],
            key: new Uint16Array(_gg[2].split('').map(Number))
        }
    } catch (error) {
        // console.log(error)
    }
    // 
    return _r;
}