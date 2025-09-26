import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Loader from '../Pages/Components/Loader';

// Lazy load all pages
const UserProfile = lazy(() => import('../Pages/User/UserProfile'));
const UserLogin = lazy(() => import('../Pages/User/UserLogin'));
const UserRegister = lazy(() => import('../Pages/User/UserRegister'));
const UserLogout = lazy(() => import('../Pages/User/UserLogout'));
const UserUpdate = lazy(() => import('../Pages/User/UserUpdate'));
const UserDelete = lazy(() => import('../Pages/User/UserDelete'));
const PageNotFound = lazy(() => import('../Pages/Components/PageNotFound'));
const Homepage = lazy(() => import('../Pages/Components/Homepage'));
const TodoList = lazy(() => import('../Pages/Todo/TodoList'));
const TodoDetails = lazy(() => import('../Pages/Todo/TodoDetails'));
const UpdateTodo = lazy(() => import('../Pages/Todo/UpdateTodo'));
const DeleteTodo = lazy(() => import('../Pages/Todo/DeleteTodo'));
const AddTodo = lazy(() => import('../Pages/Todo/AddTodo'));
const AddContact = lazy(() => import('../Pages/Contact/AddContact'));
const DeleteContact = lazy(() => import('../Pages/Contact/DeleteContact'));
const UpdateContact = lazy(() => import('../Pages/Contact/UpdateContact'));
const ContactDetails = lazy(() => import('../Pages/Contact/ContactDetails'));
const ContactList = lazy(() => import('../Pages/Contact/ContactList'));
const ContactFilter = lazy(() => import('../Pages/Contact/ContactFilter'));

const AllRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/update"
          element={
            <PrivateRoute>
              <UserUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete"
          element={
            <PrivateRoute>
              <UserDelete />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <UserLogout />
            </PrivateRoute>
          }
        />

        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-todo"
          element={
            <PrivateRoute>
              <AddTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-todo/:id"
          element={
            <PrivateRoute>
              <DeleteTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-todo/:id"
          element={
            <PrivateRoute>
              <UpdateTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/todo-details/:id"
          element={
            <PrivateRoute>
              <TodoDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-contact"
          element={
            <PrivateRoute>
              <AddContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-contact/:id"
          element={
            <PrivateRoute>
              <DeleteContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-contact/:id"
          element={
            <PrivateRoute>
              <UpdateContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact-details/:id"
          element={
            <PrivateRoute>
              <ContactDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact-filter"
          element={
            <PrivateRoute>
              <ContactFilter />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
