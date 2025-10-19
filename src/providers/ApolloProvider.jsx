import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");

    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            "x-user-id": userId || "",
            "x-user-email": userEmail || "",
        },
    }));

    return forward(operation);
});

const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {},
        },
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
        query: {
            fetchPolicy: "network-only",
            errorPolicy: "all",
        },
        mutate: {
            errorPolicy: "all",
        },
    },
});

export function ApolloProvider({ children }) {
    return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

export { client };
