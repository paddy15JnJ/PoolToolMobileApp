import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  AppRegistry,
  ScrollView,
  RefreshControl
} from "react-native";

import { StackNavigator } from "react-navigation";
import { oauth, net, smartstore, smartsync } from "react-native-force";

import { Button } from "react-native";
import TableIsAvailable from "../Components/TableIsAvailableComponent";
import TableIsInUse from "../Components/TableIsUnAvailableComponent";

class IsTableAvailableScreen extends React.Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this._onRefresh = this._onRefresh.bind(this);
    this.state = {
      data: [],
      refreshing: false
    };
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
    that.fetchData();
  }

  _onRefresh() {
    var that = this;
    this.setState({ refreshing: true });
    that.fetchData();
  }
  fetchData() {
    var that = this;
    net.query(
      "SELECT Name, IsTableFree__c, LastTimeUsed__c FROM IsPoolTableFree__c LIMIT 10",
      response => that.setState({ data: response.records })
    );
    this.setState({ refreshing: false });
  }

  render() {
    console.log(this.state.data.length);
    if (this.state.data.length === 1) {
      const date = this.state.data[0].LastTimeUsed__c;
      console.log(this.state.data[0].IsTableFree__c);
      if (this.state.data[0].IsTableFree__c) {
        var res = date.split("T");
        res[1] = res[1].substring(0, 5);
        return (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <TableIsAvailable />
            <Text style={styles.textCentre}>The Table Has Been Free Since</Text>
            <Text style={styles.textCentre}>{res[0]}</Text>
            <Text style={styles.textCentre}>{res[1]}</Text>
          </ScrollView>
        );
      } else {
        var res = date.split("T");
        res[1] = res[1].substring(0, 5);
        return (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <TableIsInUse />
            <Text style={styles.textCentre}>
              The Table Has Been In Use Since :
            </Text>
            <Text style={styles.textCentre}>{res[0]}</Text>
            <Text style={styles.textCentre}>{res[1]}</Text>
          </ScrollView>
        );
      }
    } else {
      return (
        <View>
          <Text style={styles.textLoadingCentre}>Loading..</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  textLoadingCentre: {
    alignSelf: "center",
    marginTop: 100
  },
  textCentre: {
    alignSelf: "center"
  }
});
module.exports = IsTableAvailableScreen;
