import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: 'Ready...',
      text: '',
    };
  }
  componentDidMount() {
    NfcManager.start();
  }
  componentWillUnMount() {
    this.cleanUp();
  }
  cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };
  onChangeText = text => {
    this.setState({
      text,
    });
  };
  writeData = async () => {};
  readData = async () => {};
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={this.onChangeText}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#888888"
          placeholder="Enter text here"
        />
        <TouchableOpacity onPress={this.writeData} style={styles.buttonWrite}>
          <Text style={styles.buttonText}>Write</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.readData} style={styles.buttonRead}>
          <Text style={styles.buttonText}>Read</Text>
        </TouchableOpacity>
        <View style={styles.log}>
          <Text>{this.state.log}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235',
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  buttonText: {
    color: 'white',
  },
  log: {
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
