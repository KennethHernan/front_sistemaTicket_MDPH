import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../Page/HomePage";
import HistorialTicket from "../Page/HistorialTicket";

/*
XkR7qLpM9aZbVnF2tG4cHy

mN3tQvPzL8jYfWcR5xHaSg

Jp9VxWlQ4tHkFzR1nM2yCg

Zt3fQmHnR6wYjLpX9gCsVa

vY7nGtLpH2mQzWkR9xFsBc

Rm5qTxNyL1pVhJfC8gWzKa

wF4yLhRmN7cKzTqX9pVgSa

cH6tQpLjR8wVxMnY3fZgKa

pJ2zLkHqN5vRwXtG8mFySc

qK8tHpLnJ4yVxZmF1gWrCs
*/
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/home/catalog/XkR7qLpM9aZbVnF2tG4cHy" replace />
          }
        />
        <Route
          path="/home/catalog/XkR7qLpM9aZbVnF2tG4cHy"
          element={<HomePage />}
        />
        <Route
          path="/home/ticket_history/mN3tQvPzL8jYfWcR5xHaSg"
          element={<HistorialTicket />}
        />
      </Routes>
    </BrowserRouter>
  );
};
