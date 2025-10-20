import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
        updateProduct(updateProductInput: $updateProductInput) {
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
                updatedAt
                createdByInfo {
                    uid
                    name
                    email
                }
            }
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($productUid: String!, $userUid: String!) {
        deleteProduct(productUid: $productUid, userUid: $userUid) {
            success
            message
        }
    }
`;
