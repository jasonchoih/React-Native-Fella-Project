import { Thread } from 'stream-chat-expo'; 
import { Channel, MessageList, MessageInput } from 'stream-chat-expo'; 
import { useAppContext } from 'config/chat/chatContext';
// 
export default props => 
{
    const { channel, thread } = useAppContext();
    // 
    return <Channel channel={channel} thread={thread} threadList>
        <Thread />
    </Channel>
}
  