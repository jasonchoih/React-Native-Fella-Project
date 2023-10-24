import { useEffect } from "react";
import { Input, FormControl, Box, Heading, Text, Button, WarningOutlineIcon, Icon, Divider, Center, Image } from "native-base";
import {  } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from '@react-navigation/native';
import { SEND } from 'store';
// 
// import PhoneCode from 'components/Tool/PhoneCode';
// 
import { useForm, Controller } from 'react-hook-form';
import validation from 'config/validation';
// 
let phone;
let landcode;
// 
export default ({navigation}) =>
{
    const { Login, LoginLoading, CountrySelects, LoginBack } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // 
    const { user, pass, email } = validation;
    // 
    const { handleSubmit, control, reset, formState: { errors }, getValues } = useForm({
        defaultValues: {}
    });
    // 
    // const phoneCodeReturn = (values) => 
    // {
    //     dispatch.models.SET({ PhoneCodeLoading:true });
    //     SEND('auth/login',{
    //         _code: Login._code,
    //         ...values
    //     })
    // };
    // 
    // useEffect(() => {
    //     if(Login&&Login._code)
    //     {
    //         dispatch.models.SET({
    //             M:{
    //                 t: '登录安全验证',
    //                 c: <PhoneCode phone={Login.phone} phoneCodeReturn={phoneCodeReturn}  />
    //             }
    //         })
    //     }
    // }, [Login]);
    // 
    // landcode = CountrySelects&&CountrySelects.calling || 86;
    // 
    const onSubmit = v => {
        dispatch.models.SET({ LoginLoading:true });
        // SEND('auth/logincode', v);
        SEND('auth/login', v);
    };
    // 
    useEffect(() => {
        if(!LoginBack) return;
        navigation.popToTop();
        dispatch.models.SET({LoginBack:false})
      }, [LoginBack]);
    // 
    return <Center height="100%" bgColor="#bcefff">
        <Box safeArea w="95%" maxW="290">
            <Heading style={{color:'#000'}} textAlign="center">Welcome back, Fella</Heading>
            <Center>
                <Image 
                    size={150} 
                    borderRadius={100}
                    alt="Fella Login" 
                    source={{
                        uri: "https://img.freepik.com/free-vector/cute-happy-shiba-inu-dog-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-8180.jpg?w=1480&t=st=1696803612~exp=1696804212~hmac=93d371f880a02097164751e8c96c2ecf34c9c36d5255e8885b7139172240dab2"
                    }}
                />
            </Center>
            <Box>
                <Controller
                    name="email"
                    control={control}
                    rules={email}
                    render={({field: { onChange, value}}) => <FormControl isInvalid={errors?.email} mb={2}>
                        {/* <FormControl.Label>Username</FormControl.Label> */}
                        <Input
                            variant="filled"
                            placeholder="Type your email" 
                            value={value}
                            onChangeText={value => onChange(value)}
                            InputLeftElement={<Icon as={<AntDesign name="mail" color="black" />} size={5} ml="3" color="muted.400" />}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            <Text style={{color:"#DC143C"}}>{errors?.email && errors.email.message}</Text>
                        </FormControl.ErrorMessage>
                    </FormControl>
                    }
                />
                <Controller
                    name="pass"
                    control={control}
                    rules={pass}
                    render={({field: { onChange, value }}) => <FormControl isInvalid={errors?.pass} mb={2}>
                        {/* <FormControl.Label>Password</FormControl.Label> */}
                        <Input
                            variant="filled"
                            placeholder="Type your password" 
                            type="password"
                            value={value}
                            onChangeText={value => onChange(value)}
                            InputLeftElement={<Icon as={<AntDesign name="lock1" />} size={5} ml="3" color="muted.400" />}
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            <Text style={{color:"#DC143C"}}>{errors?.pass && errors.pass.message}</Text>
                        </FormControl.ErrorMessage>
                    </FormControl>
                    }
                />
                
                <Box mb={2}>
                    {/* <Text fontSize='xs' textAlign='right' onPress={()=>navigation.navigate('wj')}>
                        Forgot Password?
                    </Text> */}
                </Box>
                <Button style={{backgroundColor:'#ffac42'}} onPress={handleSubmit(onSubmit)} isLoading={LoginLoading}>
                    <Text style={{color:"#000"}}>Login</Text>
                </Button>
                <Divider my="6" 
                    _light={{
                        bg: "muted.200"
                    }} 
                    _dark={{
                        bg: "muted.50"
                    }} 
                    thickness="0.5"
                />
                <Center>
                    <Text style={{color:"#000"}} mb={2} fontSize="sm">
                        Don't have an account?
                        <Link to={{ screen: 'register' }}> Join now</Link>
                    </Text>
                </Center>
            </Box>
        </Box>
    </Center>
}