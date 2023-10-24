import { useCallback, useEffect, useState } from "react";
import { View, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from 'store';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { AppProvider } from "config/chat/chatContext";
import { asfetch } from 'utils/asfetch';
// 
import Modal from 'components/Modal';
import Routes from 'config/routes';
//  
import theme from 'config/theme';
// 
SplashScreen.preventAutoHideAsync();
// 
export default App = () =>
{
  const [ appIsReady, setAppIsReady ] = useState(false);
  
  const scheme = useColorScheme();
  // 
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  // 
  useEffect(() => {
    async function prepare() {
      try {
        let { url, sign, key } = await asfetch();
        wss = new WebSocket('wss://'+url+'/w'+sign);
        wss.ikey = key;
        wss.binaryType = 'arraybuffer';
        store.dispatch.models.SET({
          wss:wss
        })
      } catch (e) {
        // console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  // 
  if (!appIsReady) return null;
  // 
  return <AppProvider>
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NativeBaseProvider theme={theme}>
              <View style={{flex:1}} onLayout={onLayoutRootView}>
                <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Routes />
                  <Modal />
                </NavigationContainer>
              </View>
            </NativeBaseProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  </AppProvider>
}