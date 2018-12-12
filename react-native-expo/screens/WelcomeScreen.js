import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the FSA Hub!</Text>
        <Button
          title="Sign In"
          onPress={() => this.props.navigation.navigate('SignIn')}
        />
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
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

export default WelcomeScreen;
