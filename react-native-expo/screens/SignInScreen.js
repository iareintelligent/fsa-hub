import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';

class SignInScreen extends Component {
  signIn = async () => {
    await AsyncStorage.setItem('userToken', 'fsa');

    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In Screen</Text>
        <Button title={'Complete Sign In'} onPress={() => this.signIn()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen;
