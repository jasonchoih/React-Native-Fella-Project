import { Image, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { HStack, Text} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons'; 
import { uploadToAws } from 'utils/aws';
import { SEND } from 'store';
// 
import styles from 'config/styles';
import { Video } from 'expo-av';
// 
export default props => 
{
  const { media } = useSelector((state) => state.models);
  const Auth = useSelector((state) => state.auths);
  // 
  const { location, color, size } = props;
  // 
  const dispatch = useDispatch();
  // 
  const pickImage = async () => 
  {
    // No permissions request is necessary for launching the image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
    }
    // 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    // 
    if (!result.canceled){
      // console.log(result.assets[0])
      let name = `${Auth.id}_${Date.now()}_${result.assets[0].fileName}`;
      switch (location) {
        case 'Tweets':
          dispatch.models.SET({
            media: {
              uri: result.assets[0].uri,
              file_type: result.assets[0].type,
              file_name: name,
              loaded: null
            }
          });
          break;
          case 'Comments':
          dispatch.models.SET({
            media: {
              uri: result.assets[0].uri,
              file_type: result.assets[0].type,
              file_name: name,
              loaded: null
            }
          });
          break;
        case 'Users/profile':
          dispatch.models.SET({
            media: {
              loaded: null,
              profile_image: result.assets[0].uri,
              ...media
            }
          });
          SEND('user/update_photo',{ profile_image: name });
          break;
        case 'Users/background':
          dispatch.models.SET({
            media: {
              loaded: null,
              profile_image_bg: result.assets[0].uri,
              ...media
            }
          });
          SEND('user/update_photo',{ profile_image_bg: name });
          break;
      }
      await uploadToAws(result.assets[0].uri,`${location}/${name}`);
    }
  };
  // 
  return <View>
    <View style={{flexDirection:'row', columnGap:10, alignItems:'center'}}>
      <TouchableWithoutFeedback onPress={pickImage}>
      <AntDesign
        name="camera" 
        size={size || 24} 
        color={color || '#808080'}
      />
    </TouchableWithoutFeedback>
    {media&&!media.loaded&&<HStack space={2} justifyContent="center">
      <ActivityIndicator /> 
      <Text>Uploading media...</Text>
    </HStack>}
    </View>
    
    {media&&(location =='Tweets' || location=="Comments") ? (
      <View style={{marginTop:10}}>
        {media.file_type == 'image' ? 
          <Image source={{ uri: media.uri }} style={styles.media} blurRadius={1} /> : 
          <Video source={{ uri: media.uri}} style={styles.media} useNativeControls/>
        }
      </View>
    ) : 
    <></>}
  </View>
}