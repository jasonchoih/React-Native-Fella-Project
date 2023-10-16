import { useEffect, useState } from "react";
import { Input, FormControl, Box, WarningOutlineIcon, InputGroup, InputLeftAddon, Image, Center } from "native-base";
import { View, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { SEND } from 'store';
import validation from 'config/validation';
// 
import Upload from 'components/Upload';
// 
import styles from './style';
// 
export default ({navigation}) =>
{
    const { userInfo, media } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    const [ show, setShow ] = useState(false);
    const dispatch = useDispatch();
    // 
    const { nick, bio, location, website, birth_date } = validation;
    // 
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {}
    });
    // 
    const onSubmit = v => {
        SEND('user/edit',v);
        navigation.pop();
    };
    //
    useEffect(()=>{
        dispatch.models.SET({
            subUserEdit: handleSubmit(onSubmit)
        })
    },[media])
    // 
    return <Box w="100%" alignSelf="center">
        <Box style={{position:'relative',  zIndex:10}}>
            <View>
                <Image
                    alt={userInfo&&userInfo.profile_image_bg || 'Profile Background'}
                    style={{width:"auto", height: 125}} 
                    source={{uri: ( userInfo&&userInfo.profile_image_bg&&"https://s3.amazonaws.com/fella-storage.com/Users/background/"+userInfo.profile_image_bg ) || 'https://img.freepik.com/free-vector/three-shiba-inu-characters-scene_603843-3529.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1696291200&semt=ais'}}
                />
                <View style={{position:'absolute', right:5, top:5}}>
                    <Upload location="Users/background" />
                </View>
                
            </View>
            
            <View>
                <Image
                    alt={userInfo&&userInfo.profile_image || 'Profile Picture'}
                    source={{uri: (media&&media.profile_image || userInfo&&userInfo.profile_image&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+userInfo.profile_image)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'}}
                    style={styles.avatar}
                />
                <View style={{position:'absolute', bottom:-20, left:28, opacity:0}}>
                    <Upload location="Users/profile" />
                </View>
            </View>
        </Box>
        

        <Box pt={55} px={3}>
            <Controller
                name="nick"
                control={control}
                rules={nick}
                defaultValue={Auth&&Auth.nick}
                render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.nick} mb={2}>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input 
                        w={{ base: "100%" }}
                        size="xs"
                        variant="underlined"
                        placeholder="Type your name" 
                        value={value}
                        onChangeText={value => onChange(value)}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.nick && errors.nick.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                }
            />
            <Controller
                name="bio"
                control={control}
                // rules={bio}
                defaultValue={Auth&&Auth.bio}
                render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.bio} mb={2}>
                    <FormControl.Label>Bio</FormControl.Label>
                    <Input 
                        w={{ base: "100%" }}
                        variant="underlined"
                        size="xs"
                        editable
                        multiline={true}
                        textAlignVertical='top'
                        placeholder="Type your bio"
                        numberOfLines={15}
                        maxLength={255}
                        value={value}
                        onChangeText={value => onChange(value)}
                    />
                </FormControl>
                }
            />

            <Controller
                name="website"
                control={control}
                // rules={website}
                defaultValue={Auth&&Auth.website}
                render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.location} mb={2}>
                    <FormControl.Label>Website</FormControl.Label>
                    <Input 
                        w={{ base: "100%" }}
                        size="xs"
                        variant="underlined"
                        keyboardType="url"
                        placeholder="Type your website" 
                        value={value}
                        onChangeText={value => onChange(value)}
                    />
                </FormControl>
                }
            />
        </Box>
    </Box>
}