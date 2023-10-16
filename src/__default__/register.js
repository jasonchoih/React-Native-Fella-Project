import { useEffect } from "react";
import { Input, FormControl, Box, Heading, Text, Button, WarningOutlineIcon, Icon, Divider } from "native-base";
import { Image, Dimensions } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
// 
import Country from 'components/Country';
// 
import { useForm, Controller } from 'react-hook-form';
import validation from 'config/validation';
// 
let landcode;
// 
/*
 Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password CHAR(60) NOT NULL, -- Store hashed and salted passwords
    FullName VARCHAR(100),
    Bio TEXT,
    ProfilePictureURL VARCHAR(255),
    RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastLoginDate DATETIME,
    VerificationStatus ENUM
*/
// 
export default ({navigation}) =>
{
    const { Register, RegisterLoading, CountrySelects } = useSelector((state) => state.models);
    // 
    const { user, password, phone, nick, parent, code } = validation;
    // 
    const dispatch = useDispatch();
    // const width = Dimensions.get('window').width;
    // 
    const { handleSubmit, control, reset, formState: { errors }, getValues, trigger } = useForm({
        defaultValues: {
        //   user: '',
        //   pass: ''
        }
    });
    // 
    landcode = CountrySelects&&CountrySelects.calling || 86;
    // 
    const time = Register&&Register.SendTime || 0;
    useEffect(() => {
        let timeoutr;
        if(time>0)
        {
            if(timeoutr) clearTimeout(timeoutr);
            timeoutr = setTimeout(()=>
            {
                dispatch.models.SET({ Register:{ ...Register, SendTime: time-1 } });
            }, 1000);
        }
    }, [time]);
    // 
    const SendCode = async(v) => 
    {
        // dispatch.models.SET({ RegisterLoading:{ phone: true } });
        try {
            let phone = getValues("phone");
            const r = await trigger("phone");
            if(r){
                SEND('auth/registercode',{
                    landcode,
                    phone
                })
            }
        } catch (error) {
            
        }
    }
    // 
    const onSubmit = v => {
        // if(!(Register&&Register._code))
        // {
        //     dispatch.models.SET({ M:{c:'请先获取验证码，谢谢！'} });
        //     return;
        // }
        dispatch.models.SET({ RegisterLoading:{ post: true } });
        SEND('auth/register',{...v,landcode,_code:Register._code});
    };
    // 
    return <Box px={3}>
        <Image 
            style={{height:100, marginBottom:10}}
            source={{uri:`https://storagetester.blob.core.windows.net/tester/v1/bg/logo.webp`}} 
            resizeMode='contain'
        />
        <Box mb={3}>
            <Heading fontSize="lg">Fella Registration</Heading>
        </Box>
        <Box>
            <Controller
                name="email"
                control={control}
                rules={email}
                render={({field: { onChange, value}}) => <FormControl isRequired isInvalid={errors?.email} mb={2}>
                    {/* <FormControl.Label>Username</FormControl.Label> */}
                    <Input
                        placeholder="Email" 
                        size='xs'
                        value={value}
                        onChangeText={value => onChange(value)}
                        InputLeftElement={<Icon as={<AntDesign name="mail" size={24} />} size={5} ml="2" color="muted.400" />}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.email && errors.email.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                }
            />
            <Controller
                name="password"
                control={control}
                rules={password}
                render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.password} mb={2}>
                    {/* <FormControl.Label>登录密码</FormControl.Label> */}
                    <Input
                        placeholder="Password" 
                        size='xs'
                        value={value}
                        onChangeText={value => onChange(value)}
                        InputLeftElement={<Icon as={<AntDesign name="lock1" />} size={5} ml="2" color="muted.400" />}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.password && errors.password.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                }
            />
            <Controller
                name="nick"
                control={control}
                rules={nick}
                render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.nick} mb={2}>
                    {/* <FormControl.Label>Phone</FormControl.Label> */}
                    <Input
                        placeholder="昵称" 
                        size='lg'
                        value={value}
                        onChangeText={value => onChange(value)}
                        InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.nick && errors.nick.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                }
            />
            <Controller
                name="parent"
                control={control}
                rules={parent}
                render={({field: { onChange, value }}) => <FormControl isInvalid={errors?.parent} mb={2}>
                    {/* <FormControl.Label>Phone</FormControl.Label> */}
                    <Input
                        placeholder="推荐人ID" 
                        inputMode='numeric'
                        size='lg'
                        value={value}
                        onChangeText={value => onChange(value)}
                        InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.nick && errors.nick.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                }
            />
            <Controller
                name="phone"
                control={control}
                rules={phone}
                render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.phone} mb={2}>
                    {/* <FormControl.Label>Phone</FormControl.Label> */}
                    <Input
                        placeholder="手机号码" 
                        value={value}
                        inputMode='numeric'
                        onChangeText={value => onChange(value)}
                        size='lg'
                        InputLeftElement={<Button width="20%" height="100%">
                            <Country />
                        </Button>
                        }
                        InputRightElement={<Button 
                            width="30%"
                            height="100%"
                            onPress={SendCode}
                            isLoading={RegisterLoading&&RegisterLoading.phone}
                            isDisabled={time>0}
                        >
                            { time>0 ? time+' 秒' : '获取验证码' }
                        </Button>}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.phone && errors.phone.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                }
            />
            <Controller
                name="code"
                control={control}
                rules={code}
                render={({field: { onChange, value }}) => <FormControl isInvalid={errors?.code} mb={2}>
                    {/* <FormControl.Label>Phone</FormControl.Label> */}
                    <Input
                        placeholder="短信验证码" 
                        variant="outline"
                        size='lg'
                        value={value}
                        onChangeText={value => onChange(value)}
                        InputLeftElement={<Icon as={<MaterialIcons name="sms" />} size={5} ml="2" color="muted.400" />}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors?.code && errors.code.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                }
            />
            <Box mt={2}>
                <Text textAlign='right' onPress={()=>navigation.navigate('wj')}>
                    忘记密码?
                </Text>
            </Box>
            <Divider my="2" _light={{
                bg: "muted.200"
                }} _dark={{
                    bg: "muted.50"
                }} 
                thickness="0.5"
            />
            <Button size="sm" onPress={handleSubmit(onSubmit)}>
                注册
            </Button>
            <Divider my="2" _light={{
                bg: "muted.200"
                }} _dark={{
                    bg: "muted.50"
                }} 
                thickness="0.5"
            />
            <Button size="sm" onPress={()=>navigation.navigate('login')}>
                登录
            </Button>
            
        </Box>
    </Box>
}