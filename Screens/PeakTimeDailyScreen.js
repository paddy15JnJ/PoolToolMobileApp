import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  AppRegistry,
  TouchableOpacity,
  Image
} from "react-native";

import { StackNavigator } from "react-navigation";
import { oauth, net, smartstore, smartsync } from "react-native-force";

import { Button } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

class PeakTimeDailyScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Daily Peak Time"
  };

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    var that = this;
    oauth.getAuthCredentials(
      () => that.fetchData(), // already logged in
      () => {
        oauth.authenticate(
          () => that.fetchData(),
          error => console.log("Failed to authenticate:" + error)
        );
      }
    );
  }

  fetchData() {
    var that = this;
    net.query(
      "SELECT Booked_Time__c FROM Pool_Table__c LIMIT 10",
      // (response) => that.setState({data: response.records})
      response => console.log(response.records)
    );
    that.setState({
      data: [
        { x: "09:00", y: 1 },
        { x: "10:00", y: 5 },
        { x: "11:00", y: 5 },
        { x: "12:00", y: 7 },
        { x: "13:00", y: 10 },
        { x: "14:00", y: 11 },
        { x: "15:00", y: 10 },
        { x: "16:00", y: 5 },
        { x: "17:00", y: 4 },
        { x: "18:00", y: 1 }
      ]
    });
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require("../images/backBtn.png")}
          />
        </TouchableOpacity>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
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
    backgroundColor: "#72a8ff"
  },
  LoadingTitle: {
    marginTop: 150,
    textAlign: "center",
    fontSize: 35,
    color: "white"
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  }
});
module.exports = PeakTimeDailyScreen;
