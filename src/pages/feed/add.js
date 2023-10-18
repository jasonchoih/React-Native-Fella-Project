import { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Image, Center, FormControl, WarningOutlineIcon, Text, Box } from "native-base";
import { SEND } from 'store';
// 
import { MentionInput } from 'react-native-controlled-mentions';
import { partType } from 'components/Tool/Mention';
// 
import validation from 'config/validation';
import UploadMedia from 'components/Upload';
// 
import styles from 'config/styles';
// 
export default ({navigation}) =>
{
    const { media, UserList, userInfo } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const [ keys, setKey ] = useState([]);
    const scheme = useColorScheme();
    // 
    const dispatch = useDispatch();
    // 
    const { handleSubmit, control, reset, formState: { errors }, getValues } = useForm({
        defaultValues: {}
    });
    // 
    const { content } = validation;
    // 
    const onSubmit = v => {
        SEND('tweet/add', { ...v, ...media, ...{id:Auth.id, nick:Auth.nick, tag:Auth.tag}})
        // findNamesWithAtSymbol(v.content)
        // dispatch.models.SET({media:''})
        navigation.pop();
    };
    // 
    useEffect(()=>{
        dispatch.models.SET({
            subFeedAdd: handleSubmit(onSubmit)
        })
    },[media])
    // 
    const findNamesWithAtSymbol = (inputString) =>{
        const regex = /@(\w+)/g;
        const matches = inputString.match(regex) || [];
        const names = matches.map(match => match.slice(1)); 
        // 
        setKey([...names])
      }
    // 
    useEffect(()=>{
        if(!keys || keys.length==0) return;
        SEND('tweet/users',{keyword:keys[0]});
    },[keys])
    // 
    const renderSuggestions = ({keyword, onSuggestionPress}) => {
        if (keyword == null) return null;
        //  
        return <>
            {UserList&&UserList
                .filter(one => one.nick.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
                .map(one => (
                    <TouchableWithoutFeedback key={one.id} onPress={() => {
                        onSuggestionPress({id: one.id, name: one.nick});
                        setKey([]);
                    }}>
                        <Box style={styles.tweetContainer} w={{ base: "80%" }}>
                            <View style={{flexDirection:'row', columnGap:10}}>
                                <View style={{flexBasis:40}}>
                                    <Center>
                                        <Image 
                                            size="xs"
                                            borderRadius={150}
                                            alt="Add Profile picture"
                                            source={{
                                                uri: (one.profile_image&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+one.profile_image)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'
                                            }}
                                        />
                                    </Center>
                                </View>
                                <View style={{flex:1, flexBasis:'auto'}}>
                                    <View style={{flexDirection:'column', columnGap:5}}>
                                        <View><Text style={styles.fb}>{one.nick}</Text></View>
                                        <View><Text style={styles.c8}>@{`${one.tag}`}</Text></View>
                                    </View>
                                </View>
                            </View>
                        </Box>
                    </TouchableWithoutFeedback>
                ))
            }
        </>
    };
    // 
    return <View>
        <View style={{flexDirection:'row', padding:5, columnGap:8}}>
            <View style={{flexBasis:40}}>
                <Center>
                    <Image 
                        size="xs"
                        borderRadius={150}
                        alt="Add Profile picture"
                        source={{uri: (userInfo&&userInfo.profile_image&&"https://s3.amazonaws.com/fella-storage.com/Users/profile/"+userInfo.profile_image)  || 'https://assets.wfcdn.com/im/62631921/compr-r85/2137/213721793/cute-shiba-inu-dog-paws-up-over-wall-dog-face-cartoon-vector-illustration-on-canvas-by-chayapoll-tummakorn-print.jpg'}}
                    />
                </Center>
            </View>
            <View style={{flex:1}}>
                <Controller
                    name="content"
                    rules={content}
                    control={control}
                    render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.content} mb={2}>
                        <MentionInput
                            color={scheme === 'dark' ? "#fff": "#000"}
                            multiline
                            style={{minHeight:50, maxHeight: 150}} 
                            placeholder="What's happening?"
                            placeholderTextColor="#808080" 
                            maxLength={1000}
                            autoFocus={true}
                            value={value}
                            onChange={value => {
                                onChange(value); findNamesWithAtSymbol(value);
                            }}
                            partTypes={[{
                                ...partType,
                                renderSuggestions,
                                isBottomMentionSuggestionsRender:true,
                                isInsertSpaceAfterMention:true
                            }]}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            {errors?.content && errors.content.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    }
                />
                <UploadMedia location='Tweets' size={36} />
            </View>
            
        </View>
    </View>
}