import React, {useState} from "react";
import {Alert, View} from "react-native";
import {Button, Checkbox, Icon, Input, Text} from "react-native-magnus";

/**
 * Permet d'afficher une tâche
 * @param {Object} todo
 * @param {Function} removeTodo
 * @param {Function} updateTodoName
 * @param {Function} markTodoAsDone
 * @returns {JSX.Element}
 * @constructor
 */
const TodoItem = ({
                      todo,
                      removeTodo,
                      updateTodoName,
                      markTodoAsDone
                  }) => {

    const [todoName, setTodoName] = useState(todo.name)
    /**
     * Affiche une demande de confirmation avant la suppression
     * @param {Object} todo
     */
    const confirmRemoveDialog = todo => {
        Alert.alert(
            "Message de confirmation",
            "Êtes vous sur de bien vouloir supprimer la tâche ?",
            [
                {
                    text: "Annulé",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {text: "OK", onPress: () => removeTodo(todo)}
            ],
            {cancelable: false}
        );
    }

    return (
        <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: .5,
            paddingBottom: 10
        }}>
            <Input
                onSubmitEditing={() => updateTodoName(todo, todoName)}
                editable={!todo.status}
                style={{fontSize: 30}}
                value={todoName}
                onChangeText={text => setTodoName(text)}
                mt={"md"}
                borderColor="#fff"
                focusBorderColor="blue700"
            />
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <Checkbox
                    onChange={() => markTodoAsDone(todo)}
                    disabled={todo.status}
                    ml="md"
                    mt="md"
                    value={todo.status} prefix={<Text>Terminée</Text>}/>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                    <Button
                        bg="red"
                        h={40}
                        w={40}
                        ml="md"
                        mt="md"
                        onPress={() => confirmRemoveDialog(todo)}
                    >
                        <Icon name="delete" color="white"/>
                    </Button>
                </View>

            </View>
        </View>
    )
}

export default TodoItem