import { TodoItem } from 'components/todo-item/todo-item';
import React, { useEffect, useState } from 'react';

import './todo-list.scss';

export interface ITodoItem {
    text: string;
    isCompleted: boolean;
    _data: string[];
}

export const TodoList = () => {
    const [todos, setTodos] = useState<ITodoItem[]>([
        {
            text: 'Помыть посуду',
            isCompleted: false,
            _data: [],
        },
        {
            text: 'Сделать зарядку',
            isCompleted: false,
            _data: [],
        },
    ]);

    useEffect(() => {
        console.log(todos);
    }, [todos]);

    const updateTodoState = (newTodo: ITodoItem) => {
        const currentTodos = [...todos];
        setTodos(
            currentTodos.map((currentTodo) =>
                newTodo.text === currentTodo.text ? { ...newTodo } : currentTodo
            )
        );
    };

    return (
        <div className="todo-list">
            <div className="todo-list__header">Твой TODO</div>
            <div className="todo-list__group todo-list__group--not-completed">Не завершенные</div>
            {todos
                .filter((todo) => !todo.isCompleted)
                .map((todo) => (
                    <TodoItem
                        key={todo.text}
                        item={todo}
                        setItem={(newTodo) => updateTodoState(newTodo)}
                    />
                ))}
            <div className="todo-list__group todo-list__group--completed">Завершенные</div>
            {todos
                .filter((todo) => todo.isCompleted)
                .map((todo) => (
                    <TodoItem
                        key={todo.text}
                        item={todo}
                        setItem={(newTodo) => updateTodoState(newTodo)}
                    />
                ))}
        </div>
    );
};
