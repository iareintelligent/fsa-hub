import React, {Component} from 'react';
import { View, StyleSheet, Text} from 'react-native';

class KnowledgeScreen extends Component
{
    render()
    {
        return (
          <View style={styles.container}>
            <Text>Knowledge Screen</Text>

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


export default KnowledgeScreen;