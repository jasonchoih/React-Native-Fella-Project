import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Text, Button, FormControl, WarningOutlineIcon, Icon } from "native-base";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { useForm, Controller } from 'react-hook-form';
import validation from 'config/validation';
// 
export default props =>
{
    const { honeCodeLoading, PhoneCodeStatus, PhoneCodeLoading } = useSelector((state) => state.models);
    const { phone, phoneCodeReturn } = props;
    // 
    const { code } = validation;
    // 
    const dispatch = useDispatch();
    // 
    const { handleSubmit, control, reset, formState: { errors }, getValues } = useForm({
        defaultValues: {
        //   user: '',
        //   pass: ''
        }
    });
    // 
    return <View>
        <Text>短信验证码已发送至手机号</Text>
        <Text>+{phone}</Text>
        <View>
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
            <Button 
                // onPress={handleSubmit(onSubmit)}
                onPress={handleSubmit(phoneCodeReturn)}
                loading={PhoneCodeLoading}
            >
                确 定
            </Button>
            <Text>如仍未收到短信验证码，请联系客服获取</Text>
        </View>
    </View>
}