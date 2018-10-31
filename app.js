/*
 * Copyright (c) 2017-present, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

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
import { DrawerNavigator, drawerLabel } from "react-navigation";

import { Button } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import TableIsAvailable from "./Components/TableIsAvailableComponent";
import PeakTimesWeeklyScreen from "./Screens/PeakTimesWeeklyScreen";
import PeakTimeDailyScreen from "./Screens/PeakTimeDailyScreen";
import IsTableAvailableScreen from "./Screens/IsTableAvailableScreen";
import LoadingPage from "./Screens/LoadingPage";
import JoinPoolTournamentScreen from "./Screens/JoinPoolTournamentScreen";
import CommonDataManager from "./Components/CommonDataManager";

class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Home",
    header: null,
    title: "Loading"
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false
    };
  }

  componentDidMount() {}
  handleChange = ChangeVal => {
    this.setState({ show: ChangeVal });
    // console.log('Here now ' + ChangeVal);
  };

  render() {
    let commonData = CommonDataManager.getInstance();
    let userId = commonData.getUserID();
    console.log(userId);
    if (userId) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
          >
            <Image
              style={styles.drawerIcon}
              source={require("./images/drawerIcon.png")}
            />
          </TouchableOpacity>
          <IsTableAvailableScreen />
        </View>
      );
    } else {
      return <LoadingPage onShowChange={this.handleChange} />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  },
  header: {
    fontSize: 24,
    color: "#72a8ff"
  },
  info: {
    fontSize: 20,
    color: "#72a8ff"
  },
  actionBtn: {
    alignItems: "center",
    backgroundColor: "#41b4fc",
    padding: 10,
    margin: 20
  },
  whiteText: {
    color: "white"
  },
  drawerIcon: {
    marginTop: 0,
    marginRight: 0,
    width: 60,
    height: 60
  }
});

export const App = DrawerNavigator({
  Home: HomeScreen,
  PeakTimesDaily: PeakTimeDailyScreen,
  PeakTimesWeekly: PeakTimesWeeklyScreen,
  TournamentSignUp: JoinPoolTournamentScreen
});
