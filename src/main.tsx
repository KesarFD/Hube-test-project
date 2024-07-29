import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <AuthProvider>
            <ApolloProvider client={client}>
                <Router>
                    <App />
                </Router>
            </ApolloProvider>
        </AuthProvider>
    );
}
