import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
// 
import styles from 'config/styles';
// 
export default () =>
{
    const width = Dimensions.get('window').width;
    // 
    const imgs = [
        'https://ukrainer.net/wp-content/uploads/2022/09/2.jpeg',
        'https://ukrainer.net/wp-content/uploads/2022/09/0-2.jpg',
        'https://e3.365dm.com/22/10/2048x1152/skynews-nafo-ukraine_5943976.jpg?20221026091546',
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F88c597e0-2402-11ee-9959-3da1f328ac3c.jpg?crop=7077%2C4718%2C402%2C386'
    ]
    // 
    return <View style={styles.mb10}>
        <Carousel
            loop
            width={width}
            height={140}
            autoPlay={true}
            data={imgs}
            style={{}}
            scrollAnimationDuration={1000}
            renderItem={({ index }) => (
               <Image 
                    style={{height:"100%"}}
                    source={{uri:imgs[index]}} 
                    // resizeMode='contain'
                />
            )}
        />
    </View>
}