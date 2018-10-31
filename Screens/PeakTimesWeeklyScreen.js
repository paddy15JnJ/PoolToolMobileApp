import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,AppRegistry,TouchableOpacity,Image
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {oauth, net, smartstore, smartsync} from 'react-native-force';

import { Button } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

class PeakTimesWeeklyScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Weekly Peak Time',
    };

    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
            var that = this;
            oauth.getAuthCredentials(
                () => that.fetchData(), // already logged in
                () => {
                    oauth.authenticate(
                        () => that.fetchData(),
                        (error) => console.log('Failed to authenticate:' + error)
                    );
                });
        }

         fetchData() {
                var that = this;
                net.query('SELECT Booked_Time__c FROM Pool_Table__c LIMIT 10',
                         // (response) => that.setState({data: response.records})
                         (response) => console.log(response.records)
                         );
                   that.setState({ data : [
                                    { x: "Monday", y: 3 },
                                    { x: "Tuesday", y: 5 },
                                    { x: "Wednesday", y: 10 },
                                    { x: "Thursday", y: 10 },
                                    { x: "Friday", y: 15 }
                                               ]})
            }
    render() {
        return (
         <View>
         <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                             >
                         <Image style = {styles.backBtn} source={require('../images/backBtn.png')} />
                            </TouchableOpacity>
         <VictoryChart
                        theme={VictoryTheme.material}
                      >
                        <VictoryLine
                          style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                          }}
                          data={this.state.data.length == 0 ? null : this.state.data}
                        />
                      </VictoryChart>
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
              backBtn : {
              width : 50,
              height : 50,
                backgroundColor: 'transparent'
              }
          });
module.exports = PeakTimesWeeklyScreen;