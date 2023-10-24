import { useSelector } from 'react-redux';
import { ChannelList } from 'stream-chat-expo'; 
import { useAppContext } from 'config/chat/chatContext';
// 
export default props =>
{
  const Auth = useSelector((state) => state.auths);
  const { setChannel } = useAppContext();
  // 
  const filters = {
      members: {
        '$in': [Auth.chat_id]
      },
  };
  // 
  const sort = {
      last_message_at: -1,
  };
  // 
  const options = { limit: 20, messages_limit: 30 };
  //  
  return <ChannelList 
    filters={filters}
    sort={sort}
    options={options}
    onSelect={(channel)=> {
      const { navigation } = props;
      setChannel(channel);
      navigation.navigate('screen');
    }}
  />
}