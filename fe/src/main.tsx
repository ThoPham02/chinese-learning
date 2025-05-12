import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import router from "./routes/routes";
import reduxStore from './store/redux';
import './index.css';

const { store, persistor } = reduxStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          className={"toast-message"}
          autoClose={2000}
          aria-label="Notification messages"
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);