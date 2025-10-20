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
