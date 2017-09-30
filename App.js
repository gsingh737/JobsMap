import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import registerForNotifications from './services/push_notifications';
import {Notifications} from 'expo';

export default class App extends React.Component {
    componentDidMount() {
        registerForNotifications();
        console.log()
        Notifications.addListener((notification) => {
            const {data: { text }, origin} = notification;
            if(origin === 'received' && text) {
                Alert.alert(
                    'New Push Notification',
                    text,
                    [{text: 'Ok.'}]
                );
            }
        });
    }

  render() {
    const MainNavigator = TabNavigator({
       welcome: {screen: WelcomeScreen},
        auth: {screen: AuthScreen},
        main: {
            screen: TabNavigator({
                map: { screen: MapScreen},
                deck: { screen: DeckScreen},
                review: {
                  screen: StackNavigator({
                      review: { screen: ReviewScreen},
                      settings: {screen: SettingScreen}
                  })
                }
            },
            {
                tabBarPosition: 'bottom',
                lazy: true,
                animationEnabled: false,
                swipeEnabled: false
            })
        }
    },
    {
        navigationOptions: {
            tabBarVisible: false
        },
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        lazy: true,
        animationEnabled: false
    });

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <MainNavigator/>
            </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
