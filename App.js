import React from 'react';
import {Platform, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import TodoComponent from "./src/compenents/TodoComponent";

export default function App() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{
                    marginTop: 40,
                    backgroundColor: '#fff'
                }}>
                    <TodoComponent/>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

