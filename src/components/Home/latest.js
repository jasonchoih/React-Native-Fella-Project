import { View, Text } from 'react-native';
import { Heading, Image } from 'native-base';
// 
export default () =>
{
    return <>
        <Heading mb={2}>Latest News</Heading>
        <Image 
            alt="Latest News"
            mb={2}
            style={{
                width:'auto',
                height: 200,
                borderRadius:10
            }}
            source={{
                uri: 'https://files.u24.gov.ua/news/2022/11/_processed/NAFO.jpg'
            }}
        />

    </>
}