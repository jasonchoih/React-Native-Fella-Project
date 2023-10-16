import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Center, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
// 
import styles from 'config/styles';
// 
import HandleLike from 'components/Feed/tweetLike';
// 
export default () =>
{
    const { UserLikes } = useSelector((state) => state.models);
    // 
    const navigation =  useNavigation();
    // 
    return <View style={styles.h100}>
        {UserLikes&&UserLikes.map((v,k)=>(
            <TouchableWithoutFeedback 
                key={k} 
                onPress={()=>navigation.navigate('feedInfo', { item:v })}
            >

            <View style={styles.tweetContainer}>
              
              <View style={{flexDirection:'row', columnGap:10}}>
                <View style={{flexBasis:40}}>
                  <Center>
                    <Image 
                        size="xs"
                        borderRadius={150}
                        alt="Add Profile picture"
                        source={{
                            uri: "https://s5.tvp.pl/images2/e/2/5/uid_e25ba3623b2643a7a08c9977caabd09b_width_1280_play_0_pos_0_gs_0_height_720_photo-nafo.png"
                        }}
                    />
                  </Center>
                </View>
                <View style={{flex:1, flexBasis:'auto'}}>
  
                  <View style={{flexDirection:'row', columnGap:5}}>
                    <View><Text style={styles.mb}>{v.name}</Text></View>
                    <View><Text style={styles.c8}>@{`${v.tag} ${v.log} ago`}</Text></View>
                  </View>
                  
                  <Text numberOfLines={5} style={styles.f16}>{v.text}</Text>
  
                  {v.media.type && 
                    <View style={styles.mediaPreview}>
                      {v.media.type == 'video' ? (
                        <Video
                          style={styles.media} 
                          source={{ uri: 'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v.media.uri}} 
                          useNativeControls
                        />
                      ) : (
                        <Image 
                          alt={v.media.uri}
                          style={styles.media} 
                          source={{ uri:'https://s3.amazonaws.com/fella-storage.com/Tweets/' + v.media.uri}} 
                        />
                      )}
                    </View>}
  
                  <View style={{flexDirection: 'row', alignItems:'center', columnGap:10, paddingTop:10}}>
  
                    <HandleLike tweet_id={v.id} isLiked={v.isLiked} likes={v.likes} />
  
                    <TouchableOpacity onPress={() => handleComment(item)} style={styles.actionButton}>
                      <FontAwesome5 name="comment" size={20} color="black" />
                      <Text style={styles.actionButtonText}> {v.comments}</Text>
                    </TouchableOpacity>
  
                  </View>
  
                </View>
              </View>
              
            </View>
          </TouchableWithoutFeedback>
        ))}
    </View>
}