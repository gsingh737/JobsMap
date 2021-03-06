/**
 * Created by User on 8/19/2017.
 */
/**
 * Created by User on 8/19/2017.
 */
/**
 * Created by User on 8/19/2017.
 */
/**
 * Created by User on 8/19/2017.
 */
/**
 * Created by User on 8/19/2017.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends Component {
    static navigationOptions = {
             title: 'Map',
             tabBarIcon: ({tintColor}) => {
                 return <Icon name={"my-location"} size={30} color={tintColor}/>
             }
         };

    state= {
        region: {
            longitude: -122,
            latitude:  37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }
    onRegionChangeComplete = (region) => {
        this.setState({region});
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck')
        });
    }

    render() {
        return(
            <View style={{flex:1}}>
                <MapView
                    region = {this.state.region}
                    style={{flex:1}}
                    onRegionChangeComplete={this.onRegionChangeComplete}/>
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title={"Search this area"}
                        backgroundColor="#009688"
                        icon={{name: 'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
}


export default connect(null, actions) (MapScreen);