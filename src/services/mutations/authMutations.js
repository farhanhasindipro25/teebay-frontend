import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            success
            message
            data {
                id
                uid
                name
                email
                phone
                address
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const LOGIN = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            success
            message
            user {
                uid
                name
                email
                phone
                address
            }
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser @client {
            uid
            name
            email
            phone
            address
        }
    }
`;
