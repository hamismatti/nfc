// @ts-nocheck
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import NfcManager, {Ndef, NfcTech, NfcEvents} from 'react-native-nfc-manager';

function buildUrlPayload(valueToWrite) {
  return Ndef.encodeMessage([Ndef.uriRecord(valueToWrite)]);
}

class App extends React.Component {
  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', tag);
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
    this.cancel();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>NFC Demo</Text>
        <TouchableOpacity style={styles.buttonWrite} onPress={this.write}>
          <Text style={styles.buttonText}>Write NFC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRead} onPress={this.read}>
          <Text style={styles.buttonText}>Read NFC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={this.cancel}>
          <Text style={styles.buttonText}>Cancel Test</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  cancel = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  write = async () => {
    try {
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NFC tags!',
      });
      console.warn(resp);
      let ndef = await NfcManager.getNdefMessage();
      console.warn(ndef);
      let bytes = buildUrlPayload('https://www.bitfactor.fi');
      await NfcManager.writeNdefMessage(bytes);
      console.warn('successfully write ndef');
      await NfcManager.setAlertMessageIOS('I got your tag!');
      this.cancel();
    } catch (error) {
      console.warn('error', error);
      this.cancel();
    }
  };
  read = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (error) {
      console.warn('error', error);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    alignSelf: 'center',
    bottom: 40,
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    color: 'black',
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235',
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  buttonCancel: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#ffa500',
  },
  buttonText: {
    color: '#ffffff',
  },
  log: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
