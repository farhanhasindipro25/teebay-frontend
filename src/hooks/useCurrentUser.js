import { useReactiveVar } from "@apollo/client/react";
import { currentUserVar } from "../providers/ApolloProvider";

export function useCurrentUser() {
    return useReactiveVar(currentUserVar);
}

export function logout() {
    currentUserVar(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
}
