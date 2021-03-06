import React from 'react';
import {View} from 'react-native';
import TodoComponent from "./src/compenents/TodoComponent";

export default function App() {
    return (
        <View style={{
            marginTop: 40,
            backgroundColor: '#fff'
        }}>
            <TodoComponent/>
        </View>
    );
}

