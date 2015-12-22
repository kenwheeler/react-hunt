'use strict';

let React = require('react-native');

let {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

let Dog = require('../sprites/Dog');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const SHOOTING_WIDTH = WINDOW_WIDTH - 40;
const SHOOTING_HEIGHT = (WINDOW_HEIGHT * 0.8) - 40;

class End extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogY: new Animated.Value(SHOOTING_HEIGHT + 50)
    }
  }
  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.dogY,
        {
          toValue: SHOOTING_HEIGHT,
          duration: 1500,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.dogY,
        {
          toValue: SHOOTING_HEIGHT + 50,
          duration: 1500,
          delay: 200,
          easing: Easing.linear
        }
      )
    ]).start(() => {
      this.props.onStateChange("SHOOTING");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shootingArea}>
          <Animated.View
            style={{
              position: "absolute",
              left: (SHOOTING_WIDTH / 2),
              top: this.state.dogY
            }}>
            <Dog status={this.props.scored ? "CAUGHT" : "LAUGH"}/>
          </Animated.View>
        </View>
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
  shootingArea: {
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: SHOOTING_WIDTH + 40,
    height: SHOOTING_HEIGHT + 40
  }
});

module.exports = End;
