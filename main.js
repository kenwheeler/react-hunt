'use strict';

let React = require('react-native');

let {
  Animated,
  AppRegistry,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} = React;

let STATES = require('./src/constants/index');
let Initial = require('./src/states/Initial');
let Intro = require('./src/states/Intro');
let Shooting = require('./src/states/Shooting');
let End = require('./src/states/End');

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const SHOOTING_HEIGHT = WINDOW_HEIGHT * 0.3;

const STATUS_BAR_HEIGHT = 20;

class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: STATES.INITIAL,
      score: 0,
      scored: false,
      attempts: 0
    };
  }
  stateChanged(gameState) {
    this.setState({
      gameState
    });
  }
  handleAttempt(scored) {
    if (this.state.attempts + 1 > 10) {
      this.setState({
        scored: false,
        score: 0,
        attempts: 0,
        gameState: "INITIAL"
      });
    } else {
      this.setState({
        score: scored ? this.state.score + 1 : this.state.score,
        attempts: this.state.attempts + 1,
        scored: scored
      });
    }
  }
  renderGameState() {
    switch(this.state.gameState) {
      case "INITIAL":  {
        return <Initial onStateChange={this.stateChanged.bind(this)}/>;
      }
      case "INTRO": {
        return <Intro onStateChange={this.stateChanged.bind(this)}/>;
      }
      case "SHOOTING": {
        return <Shooting
          onAttempt={this.handleAttempt.bind(this)}
          onStateChange={this.stateChanged.bind(this)}/>
      }
      case "END": {
        return <End
          scored={this.state.scored}
          onStateChange={this.stateChanged.bind(this)}/>
      }
      default: {
        return <Initial onStateChange={this.stateChanged.bind(this)}/>;
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ground}/>
        <Image
            style={styles.stage}
            source={{uri: "https://i.imgur.com/6wiJmng.png"}}/>
        {this.renderGameState()}
        <View style={styles.score}>
          <Text style={styles.scoreText}>
            Score: {this.state.score}
          </Text>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db"
  },
  score: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "transparent"
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  ground: {
    position: "absolute",
    backgroundColor: "#8B7300",
    bottom: 0,
    left: 0,
    height: SHOOTING_HEIGHT - 40,
    width: WINDOW_WIDTH
  },
  stage: {
    position: "absolute",
    left: 0,
    width: 375,
    height: 84,
    bottom: SHOOTING_HEIGHT / 2
  }
});

AppRegistry.registerComponent('main', () => Stage);
