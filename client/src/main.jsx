import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store, persistor } from "./store/store.js";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/Login.jsx";
import SignupForm from "./components/Signup.jsx";
import TodoApp from "./components/TodoManagement.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingProvider } from "./components/loading/loading.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/mytodo",
        element: <TodoApp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} />
        <RouterProvider router={router} />
      </Provider>
    </LoadingProvider>
  </StrictMode>
);
