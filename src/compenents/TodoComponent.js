import React, {useState, useEffect} from 'react'
import FILTERS from "../utils/FILTERS";
import {Button, Input, Radio, Text} from "react-native-magnus";
import {View, Alert} from "react-native";
import Todo from "../Entity/Todo";
import useIncrement from "../hooks/useIncrement";
import TodoListItem from "./TodoListItem";

const TodoComponent = () => {

    const [todos, setTodos] = useState([])
    const [filterTodos, setFilterTodos] = useState([])
    const [todoName, setTodoName] = useState("")
    const [currentFilter, setCurrentFilter] = useState(FILTERS.FILTER_ALL)
    const [counter, increment] = useIncrement(1,1)
    /**
     * Permet d'ajouter une tâche à la liste des tâches
     * @param {Object} todo
     */
    const addTodo = todo => {
        if (todo.name.trim().length <= 2) return
        setTodos(prevTodos => [todo, ...prevTodos])
        increment()
        resetInput()
    }
    /**
     * Permet de supprimer une tâche
     * @param {Object} todo
     */
    const removeTodo = todo => {
        setTodos(todos => todos.filter(t => t.uid !== todo.uid))
        Alert.alert(
            "Message de succès",
            `La tâche ${todo.name} a bien été supprimée`)
    }

    /**
     * Permet de mettre à jour une tâche
     * @param {Object} todo
     * @param {String} newName
     */
    const updateTodoName = (todo, newName) => {
        const todoIndex = todos.findIndex(t => t.uid === todo.uid)
        if (-1 !== todoIndex){
            todo.name = newName
            const tmpTodos = todos
            tmpTodos[todoIndex] = todo
            setTodos(() => [...[], ...tmpTodos])

            Alert.alert(
                "Message de succès",
                `La tâche ${todo.name} a bien été mise à jour`)
        }
    }
    /**
     * Permet de marquer une tâche terminée
     * @param {Object} todo
     */
    const markTodoAsDone = todo => {
        const todoIndex = todos.findIndex(t => t.uid === todo.uid)
        if (-1 !== todoIndex){
            todo.status = true
            const tmpTodos = todos
            tmpTodos.splice(todoIndex, 1, todo)
            setTodos(() => [...[], ...tmpTodos])
            Alert.alert(
                "Message de succès",
                `La tâche ${todo.name} a bien été marquée terminée`)
        }
    }
    /**
     * Permet de réinitialiser le champ
     */
    const resetInput = () => setTodoName("")

    /**
     * Permet de filtrer les tâches
     */
    const filterTodo = () => {
        switch (currentFilter) {
            case FILTERS.FILTER_ALL: setFilterTodos(todos)
                break
            case FILTERS.FILTER_DONE: setFilterTodos(() => todos.filter(todo => todo.status))
                break
            case FILTERS.FILTER_WAITING: setFilterTodos(() => todos.filter(todo => !todo.status))
                break
        }
    }

    /**
     * Permet d'appliquer le filtre sur les tâches selon
     * que le tableau des tâches changes ou selon que le filtre actuel change de valeur
     */
    useEffect(() => {
        filterTodo()
    }, [todos, currentFilter])

    return (
        <>
            <Input
                onSubmitEditing={() => addTodo(new Todo(counter, todoName,  false, Date.now()).toObject())}
                style={{fontSize: 30}}
                value={todoName}
                onChangeText={text => setTodoName(text)}
                placeholder="Nouvelle tâche"
                p={10}
                mt={"md"}
                ml={"md"}
                mr={"md"}
                focusBorderColor="blue700"
            />
            <View>
                <Button
                    onPress={() => addTodo((new Todo(counter, todoName,  false, Date.now())).toObject())}
                    style={{
                        display: 'flex',
                        alignSelf: 'flex-end',
                        position: 'relative',
                        textAlign: 'left'
                    }}
                    mt="lg"
                    ml="md"
                    px="xl"
                    py="lg"
                    bg="blue500"
                    left={240}
                    rounded="circle"
                    color="white"
                    shadow={2}
                >
                    Ajouter
                </Button>
                <Radio.Group
                    defaultValue={currentFilter}
                    onChange={filter => setCurrentFilter(filter)}
                    row
                    mt="md">
                    <Radio
                        m="md"
                        value={FILTERS.FILTER_ALL}
                        prefix={<Text m="md">Tous</Text>}/>
                    <Radio
                        m="md"
                        value={FILTERS.FILTER_WAITING}
                        prefix={<Text m="md">En attente</Text>}/>
                    <Radio
                        m="md"
                        value={FILTERS.FILTER_DONE}
                        prefix={<Text m="md">Terminé</Text>}/>
                </Radio.Group>
            </View>
            <TodoListItem
                todos={filterTodos}
                currentFilter={currentFilter}
                updateTodoName={updateTodoName}
                removeTodo={removeTodo}
                markTodoAsDone={markTodoAsDone}
            />
        </>
    );
}

export default TodoComponent