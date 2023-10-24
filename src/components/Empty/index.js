import { ActivityIndicator } from 'react-native';
import { Image, Center, Text } from 'native-base';
// 
export default props =>
{
    const { data } = props;
    // 
    if(!data) return <Center pt={2}><ActivityIndicator size="large" /></Center>
    // 
    return <Center height="275">
        <Image 
            alt="Empty"
            size={200}
            resizeMode='center'
            source={(require('../../../assets/empty/no_data.png'))}
        />
        <Text fontSize='md' bold>No Data Found</Text>
    </Center>
}