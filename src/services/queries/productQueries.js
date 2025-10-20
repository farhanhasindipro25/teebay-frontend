import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query {
        products {
            success
            message
            data {
                id
                uid
                title
                description
                price
                rentalPrice
                rentalType
                rentStartsAt
                rentEndsAt
                categories
                isBought
                isRented
                createdById
                createdByInfo {
                    uid
                    name
                    email
                }
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query GetProduct($uid: String!) {
        product(uid: $uid) {
            success
            message
            data {
                id
                uid
                title
                description
                price
                rentalPrice
                rentalType
                rentStartsAt
                rentEndsAt
                categories
                isBought
                isRented
                createdById
                createdByInfo {
                    uid
                    name
                    email
                }
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_PRODUCTS_BY_USER = gql`
    query GetProductsOfUser($userUid: String!) {
        productsByUser(userUid: $userUid) {
            success
            message
            data {
                uid
                title
                description
                price
                rentalPrice
                rentalType
                rentStartsAt
                rentEndsAt
                categories
                isBought
                isRented
                createdById
                createdByInfo {
                    uid
                    name
                    email
                }
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;
