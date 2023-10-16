// import { useEffect } from "react";
// import { Heading, Input, FormControl, WarningOutlineIcon, Box, Icon, Button, Text } from "@gluestack-ui/themed";
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
//     const { } = useSelector((state) => state.models);
//     // 
//     const { user, pass, phone } = validation;
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
//     return <Box>
//         <Image 
//             style={{width:width, height:100, marginBottom:10}}
//             source={{uri:`https://storagetester.blob.core.windows.net/tester/v1/bg/logo.webp`}} 
//             resizeMode='contain'
//         />
//         <Box alignSelf="center">
//             <Heading fontSize="lg"><Text>账号密码登陆</Text></Heading>
//         </Box>
//         <Box px="50">
//             <Controller
//                 name="user"
//                 control={control}
//                 rules={user}
//                 render={({field: { onChange, value}}) => <FormControl isRequired isInvalid={errors?.user}>
//                     {/* <FormControl.Label>Username</FormControl.Label> */}
//                     <Input
//                         placeholder="登录账号" 
//                         value={value}
//                         onChangeText={value => onChange(value)}
//                         py={3}
//                         InputLeftElement={<Icon as={<AntDesign name="user" size={24} color="black" />} size={5} ml="2" color="muted.400" />}
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
//                         placeholder="登录密码" 
//                         value={value}
//                         onChangeText={value => onChange(value)}
//                         py={3}
//                         InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.pass && errors.pass.message}
//                     </FormControl.ErrorMessage>
//                 </FormControl>
//                 }
//             />
//             <Controller
//                 name="phone"
//                 control={control}
//                 rules={pass}
//                 render={({field: { onChange, value }}) => <FormControl isRequired isInvalid={errors?.pass}>
//                     {/* <FormControl.Label>Phone</FormControl.Label> */}
//                     <Input
//                         // placeholder="Phone" 
//                         value={value}
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
//                             // onPress={()=>SEND('auth/registercode', {})}
//                             onPress={()=>console.log(phone)}
//                         >
//                             短信验证码
//                         </Button>}
//                     />
//                     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//                         {errors?.phone && errors.phone.message}
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
//             {/* <Button size="sm" onPress={()=>reset()} mt={2}>
//                 Clear
//             </Button> */}
            
//         </Box>
//     </Box>
// }