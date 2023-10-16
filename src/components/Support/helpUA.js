import { View, Text, Image } from 'react-native';
import styles from 'config/styles';
import { Heading } from 'native-base';
// 
export default () =>
{
    const supports = [
        [
            'UNITED24', 
            'https://u24.gov.ua/', 
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/United24_full.svg/640px-United24_full.svg.png'
        ],
        [
            'Come Back Alive', 
            'https://savelife.in.ua/en/', 
            'https://good-time-invest.com/wp-content/uploads/2022/06/snimok-ekrana-2022-06-23-v-15.57.28.png'
        ],
        [
            'Serhiy Prytula', 
            'https://prytulafoundation.org/', 
            'https://scontent-iev1-1.xx.fbcdn.net/v/t39.30808-6/294616431_145621521453151_1955718552327534606_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=ZULgp5hJYCgAX-Z3IL3&_nc_ht=scontent-iev1-1.xx&oh=00_AfAJ9IRmlCVkEiah2BhkvcgVhRYXaA_YBBxxScLMMt_ZnQ&oe=6514632C'
        ],
        [
            'Hospitallers', 
            'https://www.hospitallers.life/', 
            'https://uploads-ssl.webflow.com/621fabdd592ed327753736bd/6220dd3b10337a4b7aedd019_Logo.png'
         ]
    ];
    // 
    return <View style={[styles.mb10]}>
        <Heading mb={2}>Want to help Ukraine?</Heading>
        <View style={[{flexDirection: 'row', flexWrap:'wrap', gap:5}]}>
            {supports.map((v,k)=>(
                <View style={[{borderWidth: 1, borderRadius:5, padding:5}, {width:"auto"}]} key={k}>
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