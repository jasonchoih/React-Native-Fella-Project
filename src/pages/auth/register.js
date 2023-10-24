import { useEffect } from "react";
import { Input, FormControl, Box, Heading, Text, Button, WarningOutlineIcon, Icon, Divider, Center, Image } from "native-base";
import { Link } from '@react-navigation/native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
// 
// import Country from 'components/Country';
// 
import { useForm, Controller } from 'react-hook-form';
import validation from 'config/validation';
// 
let landcode;
// 
export default ({navigation}) =>
{
    const { Register, RegisterLoading, CountrySelects, RegisterBack } = useSelector((state) => state.models);
    // 
    const { user, pass, email, phone, nick, parent, code } = validation;
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
    // landcode = CountrySelects&&CountrySelects.calling || 86;
    // 
    // const time = Register&&Register.SendTime || 0;
    // useEffect(() => {
    //     let timeoutr;
    //     if(time>0)
    //     {
    //         if(timeoutr) clearTimeout(timeoutr);
    //         timeoutr = setTimeout(()=>
    //         {
    //             dispatch.models.SET({ Register:{ ...Register, SendTime: time-1 } });
    //         }, 1000);
    //     }
    // }, [time]);
    // 
    // const SendCode = async(v) => 
    // {
    //     // dispatch.models.SET({ RegisterLoading:{ phone: true } });
    //     try {
    //         let phone = getValues("phone");
    //         const r = await trigger("phone");
    //         if(r){
    //             SEND('auth/registercode',{
    //                 landcode,
    //                 phone
    //             })
    //         }
    //     } catch (error) {
            
    //     }
    // }
    // 
    const onSubmit = v => {
        // if(!(Register&&Register._code))
        // {
        //     dispatch.models.SET({ M:{c:'请先获取验证码，谢谢！'} });
        //     return;
        // }
        dispatch.models.SET({ RegisterLoading:{ post: true } });
        SEND('auth/register',{
            ...v,landcode,
            // _code:Register._code
        });
    };
    // 
    useEffect(() => {
        if(!RegisterBack) return;
        navigation.popToTop();
      }, [RegisterBack]);
    // 
    return <Center height="100%" bgColor="#bcefff">
        <Box safeArea w="95%" maxW="290">
            <Heading style={{color:"#000"}} textAlign="center">NAFO Expansion</Heading>
            <Center>
                <Image 
                    size={150} 
                    borderRadius={100}
                    alt="Fella Login" 
                    source={{
                        uri: "https://img.freepik.com/free-vector/8400-6-205_138676-8187.jpg?w=1480&t=st=1696804465~exp=1696805065~hmac=3f46e66454599117ee44b64c6e054a0a880bb17952d6e0b83b9844cf20cfe5cd"
                    }}
                />
            </Center>
            <Box>
                <Controller
                    name="email"
                    control={control}
                    rules={email}
                    render={({field: { onChange, value}}) => <FormControl isRequired isInvalid={errors?.email} mb={2}>
                        {/* <FormControl.Label>Username</FormControl.Label> */}
                        <Input
                            placeholder="Email" 
                            variant="filled"
                            value={value}
                            onChangeText={value => onChange(value)}
                            InputLeftElement={<Icon as={<AntDesign name="mail" size={24} />} size={5} ml="3" color="muted.400" />}
                            backgroundColor="#fff"
                            borderColor="#fff"
                            color="#000"
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
                    render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.pass} mb={2}>
                        {/* <FormControl.Label>登录密码</FormControl.Label> */}
                        <Input
                            placeholder="Password" 
                            type="password"
                            variant="filled"
                            value={value}
                            onChangeText={value => onChange(value)}
                            InputLeftElement={<Icon as={<AntDesign name="lock1" />} size={5} ml="3" color="muted.400" />}
                            backgroundColor="#fff"
                            borderColor="#fff"
                            color="#000"
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            <Text style={{color:"#DC143C"}}>{errors?.pass && errors.pass.message}</Text>
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
                            placeholder="Name" 
                            variant="filled"
                            value={value}
                            onChangeText={value => onChange(value)}
                            InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="3" color="muted.400" />}
                            backgroundColor="#fff"
                            borderColor="#fff"
                            color="#000"
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            <Text style={{color:"#DC143C"}}>{errors?.nick && errors.nick.message}</Text>
                        </FormControl.ErrorMessage>
                    </FormControl>
                    }
                />
                <Button style={{backgroundColor:'#ffac42'}} mt={2} onPress={handleSubmit(onSubmit)} isLoading={RegisterLoading}>
                    <Text style={{color:"#000"}}>Join the Bonk</Text>
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
                        Already Registered?
                        <Link to={{ screen: 'login' }}> Sign in now</Link>
                    </Text>
                </Center>
            </Box>
        </Box>
    </Center>
}