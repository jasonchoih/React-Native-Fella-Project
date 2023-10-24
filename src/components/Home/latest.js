import { View, Text } from 'react-native';
import { Heading, Image } from 'native-base';
// 
export default () =>
{
    return <>
        <Heading mb={2}>Know your Vatniks</Heading>
        <Image 
            alt="Pack"
            mb={2}
            style={{
                width:'auto',
                height: 300,
                borderRadius:10
            }}
            source={{
                uri: 'https://pbs.twimg.com/media/Fzx32b2XgAI12GS?format=png&name=900x900'
            }}
        />
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
        <Heading mb={2}>Join the Fella Pack</Heading>
        <Image 
            alt="Pack"
            mb={2}
            style={{
                width:'auto',
                height: 200,
                borderRadius:10
            }}
            source={{
                uri: 'https://nafo-ofan.org/cdn/shop/files/forge.jpg?v=1672178257&width=1500'
            }}
        />
        

    </>
}