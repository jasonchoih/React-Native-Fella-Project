import { Image, Center, Heading, Text } from 'native-base';
import { Link } from '@react-navigation/native';
import { useSelector } from 'react-redux';
// 
export default ({ children }) => 
{
    const Auth = useSelector((state) => state.auths);
    // 
    if (!Object.keys(Auth).length == 0) return children; 
    // 
    return <Center height="100%" bgColor="#bcefff">
      <Heading>Authorized Fellas Only</Heading>
      <Image
        size={180} 
        alt="Fella Authorization" 
        source={require('../../../assets/authorization/1.png')} 
      />
      <Center>
          <Link to={{screen:'login'}}>Tap here to login now</Link>
      </Center>
    </Center>
};