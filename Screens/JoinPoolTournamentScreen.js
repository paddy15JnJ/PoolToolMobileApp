import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  AppRegistry,
  Image,
  TouchableHighlight,
  TextInput,
  TouchableOpacity
} from "react-native";

import { StackNavigator } from "react-navigation";
import { oauth, net, smartstore, smartsync } from "react-native-force";
import { Button } from "react-native";

class JoinPoolTournamentScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Join Pool Tournament!"
  };

  constructor(props) {
    super(props);
    this.state = {
      Email: "Email",
      FirstName: "First Name",
      LastName: "Last Name",
      Response: [],
      Error: []
    };
  }

  sendData() {
    if (
      this.state.FirstName != "First Name" &&
      this.state.LastName != "Last Name" &&
      this.state.Email != "Email"
    ) {
      net.create(
        "Contact",
        {
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          Email: this.state.Email
        },
        response => this.setState({ Response: response.records }),
        err => this.setState({ Error: err.errors })
      );
    }
    if ((this.state.Error.length = 0)) {
    }
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

        <Text style={styles.centre}>Join The EDC Pool Tournament Today!</Text>
        <Text style={styles.centre}>Begins the 25th of November!</Text>
        <TextInput
          style={styles.emailInput}
          onChangeText={FirstName => this.setState({ FirstName })}
          value={this.state.FirstName}
        />
        <TextInput
          style={styles.emailInput}
          onChangeText={LastName => this.setState({ LastName })}
          value={this.state.LastName}
        />
        <TextInput
          style={styles.emailInput}
          onChangeText={Email => this.setState({ Email })}
          value={this.state.Email}
        />
        <TouchableOpacity onPress={() => this.sendData()}>
          <Text style={styles.submitBtn}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  LoadingTitle: {
    marginTop: 150,
    textAlign: "center",
    fontSize: 35,
    color: "white"
  },
  entryIcon: {
    marginTop: 50,
    width: 200,
    height: 200,
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  emailInput: {
    margin: 20,
    height: 40,
    borderColor: "#72a8ff",
    borderWidth: 3,
    backgroundColor: "transparent"
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  submitBtn: {
    fontSize: 18,
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#72a8ff"
  },
  centre: {
    alignSelf: "center"
  }
});
module.exports = JoinPoolTournamentScreen;
