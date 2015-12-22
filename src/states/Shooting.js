'use strict';

let React = require('react-native');

let {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} = React;

let Duck = require('../sprites/Duck');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const SHOOTING_WIDTH = WINDOW_WIDTH - 40;
const SHOOTING_HEIGHT = (WINDOW_HEIGHT * 0.8) - 40;

const DUCK_SPEED = 1000;

let lastX, lastY, id;

const random = (start, stop) => Math.floor(Math.random() * stop) + start;

class Shooting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pivot: 0,
      duckStatus: "REGULAR",
      duckReverse: false,
      duckPosition: new Animated.ValueXY({
        x: random(0, SHOOTING_WIDTH),
        y: SHOOTING_HEIGHT
      })
    };
  }
  duckKilled() {
    let endX;
    this.setState({
      duckStatus: "DEAD"
    });
    this.state.duckPosition.stopAnimation((pos) => {
      endX = pos.x;
    });
    Animated.timing(
      this.state.duckPosition,
      {
        toValue: {x: endX, y: SHOOTING_HEIGHT + 40},
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => {
      this.props.onAttempt(true);
      this.props.onStateChange("END");
    });
  }
  generateDuckPosition(end) {
    const DUCK_LEFT = end ?
      (random(0, 1) ? SHOOTING_WIDTH + 40 : -40) : random(0, SHOOTING_WIDTH);
    const DUCK_TOP = random(0, SHOOTING_HEIGHT);

    return Animated.timing(
      this.state.duckPosition,
      {
        toValue: {x: DUCK_LEFT, y: DUCK_TOP},
        duration: DUCK_SPEED,
        easing: Easing.linear
      }
    );
  }
  positionListener(pos) {
    if (lastX) {
      if (pos.x === lastX) return;

      let x = lastX - pos.x;
      let y = lastY - pos.y;
      let r = Math.atan2(y,x);
      let angle = Math.round(r * 180 / Math.PI);
      if (angle < 0) {
        angle = 360 - Math.abs(angle);
      }

      let status = angle < 90 && angle > 30 || angle === 0 ? "ANGLE" : "REGULAR";
      let direction = pos.x > lastX;

      this.setState({
        duckReverse: direction,
        duckStatus: status
      });

      lastX = pos.x;
      lastY = pos.y;
    } else {
      lastX = pos.x;
      lastY = pos.y;
    }
  }
  releaseTheDuck() {
    Animated.sequence([
      this.generateDuckPosition(),
      this.generateDuckPosition(),
      this.generateDuckPosition(),
      this.generateDuckPosition(true)
    ]).start(() => {
      if (this.state.duckStatus !== "DEAD") {
        this.props.onAttempt();
        this.props.onStateChange("END");
      }
    });
  }
  componentDidMount() {
    id = this.state.duckPosition.addListener(this.positionListener.bind(this));
    this.releaseTheDuck();
  }
  componentWillUnmount() {
    this.state.duckPosition.removeListener(id);
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor="rgba(255,0,0,0.25)"
        style={styles.container}>
        <View style={styles.shootingArea}>
          <Animated.View
            style={{
              position: "absolute",
              transform: [{
                rotateY: this.state.duckReverse ? "0deg" : "180deg"
              }],
              left: this.state.duckPosition.x,
              top: this.state.duckPosition.y
            }}>
            <Duck
              status={this.state.duckStatus}
              onKilled={this.duckKilled.bind(this)}/>
          </Animated.View>
        </View>
      </TouchableHighlight>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
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

module.exports = Shooting;
