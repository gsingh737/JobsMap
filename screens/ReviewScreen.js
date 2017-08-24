/**
 * Created by User on 8/19/2017.
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

class ReviewScreen extends Component {
    static navigationOptions = ({navigation}) =>  {
            return {
                headerRight: <Button title="Settings" onPress={() => navigation.navigate('settings')} />,
                title: 'Review Jobs'
            }
    }

    render() {
        return(
            <View>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
                <Text>AuthScreen</Text>
            </View>
        )
    }
}

export default ReviewScreen;