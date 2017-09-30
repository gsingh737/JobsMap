/**
 * Created by User on 8/19/2017.
 */

import React, {Component} from 'react';
import {View, Text, Platform, ScrollView, Linking} from 'react-native';
import {Button, Card, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';
class ReviewScreen extends Component {
    static navigationOptions = ({navigation}) =>  {
            return {
                headerRight: <Button title="Settings"
                                     onPress={() => navigation.navigate('settings')}
                                     backgroundColor={"rgba(0,0,0,0)"}
                                     color={"rgba(0, 125, 125, 1)"}
                            />,
                style: {
                    marginTop: Platform.OS === 'android' ? 24 : 0
                },
                title: 'Review Jobs',
                tabBarIcon: ({tintColor}) => {
                    return <Icon name={"favorite"} size={30} color={tintColor}/>
                }

            }
    }
    renderLikedJobs() {
        console.log(this.props.likedJobs);
        return this.props.likedJobs.map(job => {
            const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey} = job;
            const initalRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };

           return (
               <Card title={jobtitle} key={jobkey}>
                   <View style={{height: 200}}>
                       <MapView
                            style={{ flex: 1}}
                            cacheEnabled={Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initalRegion}
                       />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                   </View>
                   <Button
                   title={"Apply Now!"}
                   backgroundColor={"#03A9F4"}
                   onPress={() => Linking.openURL(job.url)}/>
               </Card>
           )
        });
    }

    render() {
        return(
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return { likedJobs : state.likedJobs };
}
const styles = {
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
}
export default connect(mapStateToProps)(ReviewScreen);