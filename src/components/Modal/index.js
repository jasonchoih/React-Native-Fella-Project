import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from "native-base";
import { useNavigation } from '@react-navigation/native';
// 
export default () => 
{
  const { M } = useSelector((state) => state.models);
  //
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // 
  if(!M) return <></>;
  const { b, bl, bt, bc, c, t, bcn, boo, f } = M;
  // 
  const onOk = () => 
  {
      if(boo&&boo.u){
        navigation.navigate('home');
        dispatch.models.SET({M:''});
        return;
      }
      dispatch.models.SET({
          M:{...M,bl:true}
      });
      b()
  }
  //
  return <Modal 
    isOpen={true} 
    onClose={() => dispatch.models.SET({M:''})}
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5
    }}
  >
    <Modal.Content maxWidth="350" maxH="712">

      <Modal.CloseButton />
      
      <Modal.Header>{!t?'Notice':t}</Modal.Header>

      <Modal.Body>{c&&c}</Modal.Body>

      {f?<Modal.Footer>
        <Button.Group space={2}>
          {!bcn&&<Button onPress={()=>bc&&bc()||dispatch.models.SET({M:''})}>
            Close
          </Button>}
          {b?<Button loading={bl} type="primary" onPress={()=>onOk()}>
            {bt||'Confirm'}
          </Button>:''}
        </Button.Group>
      </Modal.Footer>:<></>}
    </Modal.Content>
  </Modal>
}