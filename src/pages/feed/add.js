import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Image, Center, FormControl, WarningOutlineIcon } from "native-base";
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
    const { media, UserList } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const [ keys, setKey ] = useState([]);
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
        return <ScrollView>
            {UserList&&UserList
                .filter(one => one.nick.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
                .map(one => (
                    <TouchableWithoutFeedback key={one.id} onPress={() => {
                        onSuggestionPress({id: one.id, name: one.nick});
                        setKey([]);
                    }}>
                        <View style={styles.tweetContainer}>
                            <View style={{flexDirection:'row', columnGap:10}}>
                                <View style={{flexBasis:40}}>
                                    <Center>
                                        <Image 
                                            size="xs"
                                            borderRadius={150}
                                            alt="Add Profile picture"
                                            source={{
                                                uri: "https://s5.tvp.pl/images2/e/2/5/uid_e25ba3623b2643a7a08c9977caabd09b_width_1280_play_0_pos_0_gs_0_height_720_photo-nafo.png"
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
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </ScrollView>
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
                        source={{
                            uri: "https://s5.tvp.pl/images2/e/2/5/uid_e25ba3623b2643a7a08c9977caabd09b_width_1280_play_0_pos_0_gs_0_height_720_photo-nafo.png"
                        }}
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
                            value={value}
                            style={{minHeight:200}}
                            onChange={value => {
                                onChange(value);
                                findNamesWithAtSymbol(value);
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
                <UploadMedia location='Tweets' />
            </View>
            
        </View>
    </View>
}