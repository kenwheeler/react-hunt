'use strict';

let React = require('react-native');

let {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} = React;

let DUCK_STATE = {
  REGULAR: {
    top: -115,
    keyframes: [0, -40, -80, -40]
  },
  ANGLE: {
    top: -155,
    keyframes: [0, -40, -80, -40]
  },
  REAR: {
    top: -195,
    keyframes: [0, -40, -80, -40]
  },
  SHOT: {
    top: -235,
    keyframes: [0]
  },
  DEAD: {
    top: -235,
    keyframes: [-40]
  }
};

let DUCK_COLOR = {
  BLUE: 0,
  BLACK: -130,
  BROWN: -260
}

let animationTimer;

class Duck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyframe: 0
    };
  }
  componentDidMount() {
    if (DUCK_STATE[this.props.status].keyframes.length > 1) {
      animationTimer = setInterval(() => {
        let end = this.state.keyframe >= DUCK_STATE[this.props.status].keyframes.length - 1;
        this.setState({
          keyframe: end ? 0 : this.state.keyframe + 1
        });
      }, 200);
    }
  }
  componentWillUnmount() {
    clearInterval(animationTimer);
  }
  render() {
    let top = DUCK_STATE[this.props.status].top;
    let left = DUCK_STATE[this.props.status].keyframes[this.state.keyframe] + DUCK_COLOR[this.props.color];
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onKilled}>
        <View style={[styles.duck, this.props.style]}>
          <Image
            style={[styles.sprite, {
              top,
              left
            }]}
            source={{uri: "https://i.imgur.com/RLnV1OJ.png"}}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

Duck.defaultProps = {
  status: "REGULAR",
  color: "BLUE"
};

let styles = StyleSheet.create({
  duck: {
    width: 35,
    height: 35,
    overflow: "hidden",
    backgroundColor: "transparent"
  },
  sprite: {
    height: 267,
    width: 375
  }
});

module.exports = Duck;