import { View, Text, Image } from 'react-native';
import styles from 'config/styles';
import { Heading } from 'native-base';
// 
export default () =>
{
    const supports = [
        [
            'NAFO', 
            'https://nafo-ofan.org/collections/all', 
            'https://nafo-ofan.org/cdn/shop/products/kiss-cut-stickers-5.5x5.5-default-63d5702f345ab.png?v=1674932590'
        ],
        [
            'Saint Javelin', 
            'https://www.saintjavelin.com/en-ua/collections/fellas-of-nafo', 
            'https://www.saintjavelin.com/cdn/shop/files/SJ-Web-Home-Image-1_540x.png?v=1646293503'
        ]
    ];
    // 
    return <View>
        <Heading mb={2}>Create your own Fund Raising</Heading>
        <View style={[{flexDirection: 'row', flexWrap:'wrap', gap:5}]}>
            {supports.map((v,k)=>(
                <View style={[{borderWidth: 1, flex:6, borderRadius:5}]} key={k}>
                    <Image 
                        source={{uri:v[2]}} 
                        style={[{minHeight:100}, styles.mb10, styles.br10]}
                        resizeMode='contain'
                    />
                    <Text style={{textAlign:'center', fontWeight: 'bold'}}>{v[0]}</Text>
                </View>
            ))}
        </View>
       
    </View>
}