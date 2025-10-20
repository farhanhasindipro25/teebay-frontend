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
