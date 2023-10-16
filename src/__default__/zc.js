// import { useEffect } from "react";
// import { Heading, Input, FormControl, WarningOutlineIcon, Box, Icon, Button, Text, Center } from "@gluestack-ui/themed";
// import { Image, Dimensions } from 'react-native';
// import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
// import { useSelector, useDispatch } from 'react-redux';
// import { SEND } from 'store';
// // 
// import Country from 'components/Country';
// // 
// import { useForm, Controller } from 'react-hook-form';
// import validation from 'config/validation';
// // 
// export default ({navigation}) =>
// {
//     const { Register, RegisterStatus, RegisterLoading } = useSelector((state) => state.models);
//     // 
//     const { user, pass, phones, nick, parent, code } = validation;
//     // 
//     const dispatch = useDispatch();
//     const width = Dimensions.get('window').width;
//     // 
//     const { handleSubmit, control, reset, formState: { errors } } = useForm({
//         defaultValues: {
//           user: '',
//           pass: ''
//         }
//     });
//     // 
//     const onSubmit = data => {
//         console.log(JSON.stringify(data));
//         // SEND({})
//     };
//     // 
//     const time = Register&&Register.SendTime || 0;
//     useEffect(() => {
//         let timeoutr;
//         if(time>0)
//         {
//             if(timeoutr) clearTimeout(timeoutr);
//             timeoutr = setTimeout(()=>
//             {
//                 dispatch.models.SET({ Register:{ ...Register, SendTime: time-1 } });
//             }, 1000);
//         }
//     }, [time]);
//     // 
//     let phone ='123123';
//     let calling = '86';
//     // 
//     const SendCode = (v) => 
//     {
//         dispatch.models.SET({ RegisterLoading:{ phone: true } });
//         phone = v.phone;
//         SEND('auth/registercode',{
//             calling,
//             phone
//         })
//     }
//     // 
//     return <Box>
//         <Image 
//             style={{width:width, height:100, marginBottom:10}}
//             source={{uri:`https://storagetester.blob.core.windows.net/tester/v1/bg/logo.webp`}} 
//             resizeMode='contain'
//         />
//         <Box alignSelf="center" mb={3}>
//             <Heading fontSize="lg"><Text>账号注册</Text></Heading>
//         </Box>
//         <Box px="50">
//             <Controller
//                 name="user"
//                 control={control}
//                 rules={user}
//                 render={({field: { onChange, value}}) => <FormControl isRequired isInvalid={errors?.user}>
//                     {/* <FormControl.Label>Username</FormControl.Label> */}
//                     <Input
//                         // placeholder="登录账号" 
//                         p={0}
//                         value={value}
//                         onChangeText={value => onChange(value)}
//                         InputLeftElement={<Box 
//                             width="20%"
//                             backgroundColor='muted.400'
//                         >
//                             <Text>登录账号</Text>
//                         </Box>}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.user && errors.user.message}
//                     </FormControl.ErrorMessage>
//                 </FormControl>
//                 }
//             />
//             <Controller
//                 name="pass"
//                 control={control}
//                 rules={pass}
//                 render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.pass}>
//                     {/* <FormControl.Label>登录密码</FormControl.Label> */}
//                     <Input
//                         // placeholder="登录密码" 
//                         value={value}
//                         onChangeText={value => onChange(value)}
//                         // py={3}
//                         InputLeftElement={<Box ml="2"><Text>登录密码</Text></Box>}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.pass && errors.pass.message}
//                     </FormControl.ErrorMessage>
//                 </FormControl>
//                 }
//             />
//             <Controller
//                 name="nick"
//                 control={control}
//                 rules={nick}
//                 render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.nick}>
//                     {/* <FormControl.Label>Phone</FormControl.Label> */}
//                     <Input
//                         // placeholder="Phone" 
//                         value={value}
//                         onChangeText={value => onChange(value)}
//                         py={3}
//                         InputLeftElement={<Box ml="2">昵称</Box>}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.nick && errors.nick.message}
//                     </FormControl.ErrorMessage>
//                 </FormControl>
//                 }
//             />
//             <Controller
//                 name="parent"
//                 control={control}
//                 rules={parent}
//                 render={({field: { onChange, value }}) => <FormControl isInvalid={errors?.parent}>
//                     {/* <FormControl.Label>Phone</FormControl.Label> */}
//                     <Input
//                         // placeholder="Phone" 
//                         inputMode='numeric'
//                         value={value}
//                         onChangeText={value => onChange(value)}
//                         py={3}
//                         InputLeftElement={<Box ml="2">推荐人ID</Box>}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.nick && errors.nick.message}
//                     </FormControl.ErrorMessage>
//                 </FormControl>
//                 }
//             />
//             <Controller
//                 name="phone"
//                 control={control}
//                 rules={phones}
//                 render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.phones}>
//                     {/* <FormControl.Label>Phone</FormControl.Label> */}
//                     <Input
//                         // placeholder="Phone" 
//                         value={value}
//                         inputMode='numeric'
//                         onChangeText={value => onChange(value)}
//                         py={3}
//                         InputLeftElement={<Button
//                             width="20%"
//                             height="100%"
//                         >
//                             <Country />
//                         </Button>
//                         }
//                         InputRightElement={<Button 
//                             width="30%"
//                             height="100%"
//                             onPress={handleSubmit(SendCode)}
//                             isLoading={RegisterLoading&&RegisterLoading.phones}
//                             isDisabled={time>0}
//                         >
//                             { time>0 ? time+' 秒' : '获取验证码' }
//                         </Button>}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.phones && errors.phones.message}
//                     </FormControl.ErrorMessage>
//                 </FormControl>
//                 }
//             />
//             <Controller
//                 name="codes"
//                 control={control}
//                 rules={code}
//                 render={({field: { onChange, value }}) => <FormControl isInvalid={errors?.code}>
//                     {/* <FormControl.Label>Phone</FormControl.Label> */}
//                     <Input
//                         // placeholder="Phone" 
//                         value={value}
//                         onChangeText={value => onChange(value)}
//                         py={3}
//                         InputLeftElement={<Box ml="2">短信验证码</Box>}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.code && errors.code.message}
//                     </FormControl.ErrorMessage>
//                 </FormControl>
//                 }
//             />
//             <Box mt={2}>
//                 <Text 
//                     textAlign='right'
//                     onPress={()=>navigation.navigate('wj')}
//                 >
//                     忘记密码
//                 </Text>
//             </Box>
//             <Button size="sm" onPress={handleSubmit(onSubmit)} mt={2}>
//                 Login
//             </Button>
//             <Button size="sm" onPress={()=>navigation.navigate('register')} mt={2}>
//                 Register
//             </Button>
            
//         </Box>
//     </Box>
// }