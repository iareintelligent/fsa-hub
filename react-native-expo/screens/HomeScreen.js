import React, {Component} from 'react';
import { View, StyleSheet, Text} from 'react-native';

class HomeScreen extends Component
{
    render()
    {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
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


export default HomeScreen;