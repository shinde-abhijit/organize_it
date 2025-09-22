import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserProfile from '../Pages/User/UserProfile'
import UserLogin from '../Pages/User/UserLogin'
import PrivateRoute from './PrivateRoute'
import UserRegister from '../Pages/User/UserRegister'
import UserLogout from '../Pages/User/UserLogout'
import UserUpdate from '../Pages/User/UserUpdate'
import UserDelete from '../Pages/User/UserDelete'
import PageNotFound from '../Pages/Components/PageNotFound'
import Homepage from '../Pages/Components/Homepage'
import TodoList from '../Pages/Todo/TodoList'
import TodoDetails from '../Pages/Todo/TodoDetails'
import UpdateTodo from '../Pages/Todo/UpdateTodo'
import DeleteTodo from '../Pages/Todo/DeleteTodo'
import AddTodo from '../Pages/Todo/AddTodo'

const AllRoutes = () => {
  return (
    <>
    
    <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element=
            {
                <PrivateRoute>
                    <Homepage />
                </PrivateRoute>
            } 
        />
        <Route path="/profile" element=
            {
                <PrivateRoute>
                    <UserProfile />
                </PrivateRoute>
            } 
        />
        <Route path="/update" element=
            {
                <PrivateRoute>
                    <UserUpdate />
                </PrivateRoute>
            } 
        />
        <Route path="/delete" element=
            {
                <PrivateRoute>
                    <UserDelete />
                </PrivateRoute>
            } 
        />
        <Route path="/logout" element=
            {
                <PrivateRoute>
                    <UserLogout />
                </PrivateRoute>
            } 
        />
        <Route path="/todos" element=
            {
                <PrivateRoute>
                    <TodoList />
                </PrivateRoute>
            } 
        />
        <Route path="/add-todo" element=
            {
                <PrivateRoute>
                    <AddTodo />
                </PrivateRoute>
            } 
        />
        <Route path="/delete-todo/:id" element=
            {
                <PrivateRoute>
                    <DeleteTodo />
                </PrivateRoute>
            } 
        />
        <Route path="/update-todo/:id" element=
            {
                <PrivateRoute>
                    <UpdateTodo />
                </PrivateRoute>
            } 
        />
        <Route path="/todo-details/:id" element=
            {
                <PrivateRoute>
                    <TodoDetails />
                </PrivateRoute>
            } 
        />
    </Routes>

    </>
  )
}

export default AllRoutes