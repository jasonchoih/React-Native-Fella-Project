import { View, Image } from 'react-native';
import { Text } from 'native-base';
import styles from 'config/styles';
import { Heading, Center } from 'native-base';
//
import u24 from '../../../assets/support/u24.png' ;
import alive from '../../../assets/support/alive.png' ;
//
export default () =>
{
    const supports = [
        [
            'UNITED24', 
            'https://u24.gov.ua/', 
            // 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/United24_full.svg/640px-United24_full.svg.png'
            u24
        ],
        [
            'Come Back Alive', 
            'https://savelife.in.ua/en/', 
            // 'https://good-time-invest.com/wp-content/uploads/2022/06/snimok-ekrana-2022-06-23-v-15.57.28.png',
            alive
        ],
        // [
        //     'Serhiy Prytula', 
        //     'https://prytulafoundation.org/', 
        //     'https://scontent-iev1-1.xx.fbcdn.net/v/t39.30808-6/294616431_145621521453151_1955718552327534606_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=ZULgp5hJYCgAX-Z3IL3&_nc_ht=scontent-iev1-1.xx&oh=00_AfAJ9IRmlCVkEiah2BhkvcgVhRYXaA_YBBxxScLMMt_ZnQ&oe=6514632C'
        // ],
        // [
        //     'Hospitallers', 
        //     'https://www.hospitallers.life/', 
        //     'https://uploads-ssl.webflow.com/621fabdd592ed327753736bd/6220dd3b10337a4b7aedd019_Logo.png'
        //  ]
    ];
    // 
    return <View style={[styles.mb20]}>
        <Heading mb={1}>Want to help Ukraine?</Heading>
        <View style={[{flexDirection:'row', justifyContent:'space-evenly'}]}>
            {supports.map((v,k)=>(
                <View style={[{padding:5}]} key={k}>
                    <Center>
                        <Image 
                            source={v[2]}
                            style={{ 
                                height: undefined, 
                                width: '60%%',
                                aspectRatio: 3/2,
                                borderRadius:5
                            }} 
                            resizeMode='contain'
                        />
                    </Center>
                    {/* <Text style={{textAlign:'center', fontWeight: 'bold'}}>{v[0]}</Text> */}
                </View>
            ))}
        </View>
       
    </View>
}