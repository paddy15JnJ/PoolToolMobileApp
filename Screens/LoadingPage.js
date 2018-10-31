import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,AppRegistry,Image,TouchableHighlight,
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {oauth, net, smartstore, smartsync} from 'react-native-force';
import { Button } from 'react-native';

import CommonDataManager from '../Components/CommonDataManager'

class LoadingPage extends React.Component {
static navigationOptions = {
    header: null,
    title: 'Loading',
    };

    constructor(props) {
        super(props);
        show : false
    }

  onPress = () => {
    this.setState({show: true});
    this.props.onShowChange(true);
    console.log('Here');
  }

    render() {
    let commonData = CommonDataManager.getInstance();
    commonData.setUserID(true);
        return (
         <View style = {styles.container}>
        <Text style = {styles.LoadingTitle}>The Pool Tool</Text>
            <TouchableHighlight onPress={this.onPress}>
        <Image style = {styles.entryIcon} source={require('../images/blackball.png')} />
         </TouchableHighlight>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#72a8ff',
    },
    LoadingTitle : {
    marginTop : 150,
    textAlign: 'center',
    fontSize : 35,
    color : 'white',
    },
    entryIcon : {
     marginTop : 50,
    width : 200,
    height : 200,
    alignSelf: 'center',
      backgroundColor: 'transparent'
    }
});
module.exports = LoadingPage;