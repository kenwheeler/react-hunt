'use strict';

let React = require('react-native');

let {
  Image,
  View,
  StyleSheet
} = React;

let DOG_STATE = {
  SNIFFING: {
    top: 0,
    keyframes: [0, -60, -120, -180, -240, -180, -120, -60]
  },
  LAUGH: {
    top: -60,
    keyframes: [-180, -240]
  },
  DIVING: {
    top: -60,
    keyframes: [0, -60, -120]
  },
  CAUGHT: {
    top: 0,
    keyframes: [-320]
  }
};

let animationTimer;

class Dog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyframe: 0
    };
  }
  componentDidMount() {
    if (DOG_STATE[this.props.status].keyframes.length > 1) {
      animationTimer = setInterval(() => {
        let end = this.state.keyframe >= DOG_STATE[this.props.status].keyframes.length - 1;
        if (this.state.keyframe === 2 && this.props.status === "DIVING") {
          clearInterval(animationTimer);
          return this.props.onStateChange("SHOOTING");
        }
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
    let top = DOG_STATE[this.props.status].top;
    let left = DOG_STATE[this.props.status].keyframes[this.state.keyframe];
    return (
      <View style={[styles.dog, this.props.style]}>
        <Image
          style={[styles.sprite, {
            top,
            left
          }]}
          source={{uri: "http://www.vaielab.com/Lab/DuckHunt/sprite.png"}}/>
      </View>
    )
  }
}

Dog.defaultProps = {
  status: "SNIFFING"
};

let styles = StyleSheet.create({
  dog: {
    width: 60,
    height: 50,
    overflow: "hidden",
    backgroundColor: "transparent"
  },
  sprite: {
    height: 400,
    width: 375
  }
});

module.exports = Dog;