import { Channel, MessageList, MessageInput } from 'stream-chat-expo'; 
import { useAppContext } from 'config/chat/chatContext';
// 
export default ({navigation}) =>
{
    const { channel, setThread } = useAppContext();
    // 
    return <Channel channel={channel}>
        <MessageList
            onThreadSelect={(message) => {
                if (channel?.id) {
                    setThread(message);
                    navigation.navigate('thread');
                }
            }}
        />
        <MessageInput />
  </Channel>
}