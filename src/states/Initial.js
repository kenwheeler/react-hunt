'use strict';

let React = require('react-native');

let {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

class Initial extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>REACT HUNT</Text>
        <TouchableOpacity onPress={this.props.onStateChange.bind(null, "INTRO")}>
          <Text style={styles.button}>TAP SOME DUCKS!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    top: -50,
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(60,188,252)",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    width: 180,
    textAlign: "center"
  },
  text: {
    fontSize: 60,
    fontWeight: "bold",
    top: -100,
    width: 260,
    textAlign: "center",
    color: "#fff"
  }
});

module.exports = Initial;
