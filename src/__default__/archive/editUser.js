import { useEffect } from "react";
import { Input, FormControl, Box, WarningOutlineIcon, InputGroup, InputLeftAddon } from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import validation from 'config/validation';
// 
export default ({navigation}) =>
{
    const { show } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const { nick, bio, location, website, birth_date } = validation;
    // 
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {}
    });
    // 
    const onSubmit = v => {
        console.log(v)
        console.log(v.birth_date.toLocaleString())
        // navigation.pop();
    };
    //
    useEffect(()=>{
        dispatch.models.SET({
            subUserEdit: handleSubmit(onSubmit)
        })
    },[])
    // 
    return <Box w="100%" alignSelf="center">
        <Controller
            name="nick"
            control={control}
            rules={nick}
            render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.nick} mb={2}>
                {/* <FormControl.Label>Username</FormControl.Label> */}
                <InputGroup>
                    <InputLeftAddon style={{backgroundColor:'yellow'}} children="Name" />
                    <Input 
                        w={{ base: "70%" }}
                        size="xs"
                        placeholder="Type your name" 
                        value={value}
                        onChangeText={value => onChange(value)}
                    />
                </InputGroup>
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
            render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.bio} mb={2}>
                {/* <FormControl.Label>Username</FormControl.Label> */}
                <InputGroup>
                    <InputLeftAddon style={{backgroundColor:'yellow'}} children="Bio" />
                    <Input 
                        w={{ base: "70%" }}
                        size="xs"
                        placeholder="Type your bio" 
                        value={value}
                        onChangeText={value => onChange(value)}
                    />
                </InputGroup>
                {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors?.bio && errors.bio.message}
                </FormControl.ErrorMessage> */}
            </FormControl>
            }
        />
        <Controller
            // name="location"
            control={control}
            // rules={location}
            render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.location} mb={2}>
                {/* <FormControl.Label>Username</FormControl.Label> */}
                <InputGroup>
                    <InputLeftAddon style={{backgroundColor:'yellow'}} children="Location" />
                    <Input 
                        w={{ base: "70%" }}
                        size="xs"
                        placeholder="Type your bio" 
                        value={value}
                        onChangeText={value => onChange(value)}
                    />
                </InputGroup>
                {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors?.location && errors.location.message}
                </FormControl.ErrorMessage> */}
            </FormControl>
            }
        />
        <Controller
            name="website"
            control={control}
            // rules={website}
            render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.location} mb={2}>
                {/* <FormControl.Label>Username</FormControl.Label> */}
                <InputGroup>
                    <InputLeftAddon style={{backgroundColor:'yellow'}} children="Website" />
                    <Input 
                        w={{ base: "70%" }}
                        size="xs"
                        placeholder="Type your website" 
                        value={value}
                        onChangeText={value => onChange(value)}
                    />
                </InputGroup>
                {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors?.website && errors.website.message}
                </FormControl.ErrorMessage> */}
            </FormControl>
            }
        />
        <Controller
            name="birth_date"
            control={control}
            // rules={birth_date}
            render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.birth_date} mb={2}>
                {/* <FormControl.Label>Username</FormControl.Label> */}
                <InputGroup>
                    <InputLeftAddon style={{backgroundColor:'yellow'}} children="Birth Date" />
                    <Input 
                        w={{ base: "70%" }}
                        size="xs"
                        placeholder="Type your birth date" 
                        // value={value.toLocaleString() || ''}
                        onFocus={()=>{
                            dispatch.models.SET({show:true})
                        }}
                    />
                </InputGroup>
                {show&&<DateTimePicker
                    testID="dateTimePicker"
                    value={value || new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display='spinner'
                    onChange={(event, selectedDate) => onChange(selectedDate)}
                />}
                
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors?.birth_date && errors.birth_date.message}
                </FormControl.ErrorMessage>
            </FormControl>
            }
        />
    </Box>
}