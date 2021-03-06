import React from "react";
import {FlatList, SafeAreaView} from "react-native";
import TodoItem from "./TodoItem";
import {Text} from "react-native-magnus";
import FILTERS from "../utils/FILTERS";

/**
 * Permet de lister l'ensemble de nos tâches
 * @param {Array} todos
 * @param {Function} removeTodo
 * @param {Function} updateTodoName
 * @param {Function} markTodoAsDone
 * @param {String} currentFilter
 * @returns {JSX.Element}
 * @constructor
 */
const TodoListItem = ({todos, removeTodo, updateTodoName, markTodoAsDone, currentFilter}) => {
    const renderItem = ({item}) => (
        <TodoItem
            todo={item}
            removeTodo={removeTodo}
            updateTodoName={updateTodoName}
            markTodoAsDone={markTodoAsDone}
        />
    )

    function displayEmptyTodoMessage() {
        switch (currentFilter) {
            case FILTERS.FILTER_DONE :
                return <Text style={{color: 'gray', fontSize: 18}}>Vous n'avez pas de tâche complétée
                    actuellement</Text>;
            case FILTERS.FILTER_WAITING :
                return <Text style={{color: 'gray', fontSize: 18}}>Vous n'avez pas de tâche en cours d'attente
                    actuellement</Text>;
            case FILTERS.FILTER_ALL :
                return <Text style={{color: 'gray', fontSize: 18}}>Vous n'avez pas de tâche actuellement</Text>;
        }
    }

    return (
        <SafeAreaView
            style={{
                margin: 15,
            }}
        >
            {todos.length > 0 ? <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.createdAt.toString()}
            /> : displayEmptyTodoMessage()
            }

        </SafeAreaView>
    )
}

export default TodoListItem