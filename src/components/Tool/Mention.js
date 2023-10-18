import { Text } from 'react-native';
import { parseValue, isMentionPartType } from 'react-native-controlled-mentions';
// 
export const partType = {
    trigger: '@',
    textStyle: {
        color: '#007acc'
    }
};
// 
export const Mention = (value, navigation) =>
{
    const { parts } = parseValue(value, [partType]);
    // 
    const renderPart = (part, index) => {
        if (!part.partType) return <Text key={index}>{part.text}</Text>;
        if (isMentionPartType(part.partType)) {
            return <Text
              key={`${index}-${part.data?.trigger}`}
              style={part.partType.textStyle}
              onPress={() => navigation.navigate('userInfo', {user_id: part.data.id})}
              
            >
              {part.text}
            </Text>
        }
    };
    return <Text>{parts.map(renderPart)}</Text>
}