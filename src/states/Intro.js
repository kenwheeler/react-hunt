'use strict';

let React = require('react-native');

let {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

let Dog = require('../sprites/Dog');

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      dogLeft: new Animated.Value(-60)
    };
  }
  componentDidMount() {
    Animated.timing(
      this.state.dogLeft,
      {
        toValue: (Dimensions.get('window').width / 2) - 30,
        duration: 2000,
        delay: 500,
        easing: Easing.linear
      }
    ).start(() => {
      this.setState({
        step: 1
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: 50,
            width: 60,
            position: "absolute",
            bottom: 100,
            left: this.state.dogLeft
          }}>
          <Dog
            onStateChange={this.props.onStateChange}
            status={this.state.step === 0 ? "SNIFFING" : "DIVING"}/>
        </Animated.View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
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

module.exports = Intro;
