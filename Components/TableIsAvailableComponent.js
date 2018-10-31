import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  AppRegistry,
  Image
} from "react-native";

import { StackNavigator } from "react-navigation";
import { oauth, net, smartstore, smartsync } from "react-native-force";

import { Button } from "react-native";

class TableIsAvailableComponent extends React.Component {
  static navigationOptions = {
    title: "The Pool Tool"
  };

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  render() {
    return (
      <View>
        <Image
          style={styles.isFreeIcon}
          source={require("../images/IsFree.png")}
        />
        <Text style={styles.textCentre}>Your In Luck, The Table Is Free!</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  isFreeIcon: {
    marginTop: 100,
    width: 250,
    height: 250,
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  textCentre: {
    alignSelf: "center"
  }
});
module.exports = TableIsAvailableComponent;
