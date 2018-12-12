import React, {Component} from 'react';
import { View, StyleSheet, Text} from 'react-native';

import AppNavigator from './config/navigation'

class App extends Component
{
    render()
    {
        return (
          <AppNavigator/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default App;
