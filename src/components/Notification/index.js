import { useEffect } from 'react';
import * as Device from 'expo-device';
import { View, Text, Button } from 'react-native'
import * as Notifications from 'expo-notifications';
// 
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});
// 
export default () =>
{
    useEffect(() => {
        // Request permissions for notifications
        (async () => {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('You need to grant notification permissions to use this feature.');
          }
        })();
        
        // Handle incoming notifications when the app is in the foreground
        const subscription = Notifications.addNotificationReceivedListener((notification) => {
          console.log(notification);
        });
    
        return () => {
          subscription.remove();
        };
    }, []);
    // 
    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
            sound: 'bonk.wav'
          },
          trigger: { seconds: 2 },
        });
      }
      // 
      const sendPushNotification = async () => {
        // Construct the notification
        const content = {
          title: 'My Notification Title',
          body: 'This is the notification body. Deez nuts',
        };
    
        // Set the time when the notification should be displayed
        const trigger = null; // To display immediately
    
        // Schedule the notification
        await Notifications.scheduleNotificationAsync({
          content,
          trigger,
        });
      };
    //   
    return <View>
        <Text>Push Notification Example</Text>
        <Button title="Send Notification" onPress={sendPushNotification} />
        <Button
            title="Press to schedule a notification"
            onPress={async () => {
                await schedulePushNotification();
            }}
        />
    </View>
}  