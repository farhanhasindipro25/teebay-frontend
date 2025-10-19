import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "./providers/ApolloProvider.jsx";
import { RouterProvider } from "./providers/RouterProvider.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <ApolloProvider>
                <RouterProvider />
            </ApolloProvider>
        </ThemeProvider>
    </StrictMode>
);
