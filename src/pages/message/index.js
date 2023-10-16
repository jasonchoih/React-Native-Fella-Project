import { useEffect, useState } from 'react';
import { chatApiKey, chatUserId, chatUserName } from 'config/chat';
import { ChannelList } from 'stream-chat-expo'; 
import { useAppContext } from 'config/chat/chatContext';
// 
export default props =>
{
  const { setChannel } = useAppContext();
  // 
  const filters = {
      members: {
        '$in': [chatUserId]
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