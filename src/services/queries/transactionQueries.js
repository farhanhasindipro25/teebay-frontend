import { gql } from "@apollo/client";

export const GET_USER_TRANSACTIONS = gql`
    query GetUserTransactions($userUid: String!) {
        getUserTransactions(userUid: $userUid) {
            success
            message
            transactions {
                bought {
                    id
                    uid
                    type
                    productInfo {
                        uid
                        title
                        price
                    }
                    sellerInfo {
                        name
                        email
                    }
                    createdAt
                }
                sold {
                    id
                    uid
                    type
                    productInfo {
                        uid
                        title
                        price
                    }
                    buyerInfo {
                        name
                        email
                    }
                    createdAt
                }
                borrowed {
                    id
                    uid
                    type
                    productInfo {
                        uid
                        title
                        rentalPrice
                        rentalType
                        rentStartsAt
                        rentEndsAt
                    }
                    sellerInfo {
                        name
                        email
                    }
                    createdAt
                }
                lent {
                    id
                    uid
                    type
                    productInfo {
                        uid
                        title
                        rentalPrice
                        rentalType
                        rentStartsAt
                        rentEndsAt
                    }
                    buyerInfo {
                        name
                        email
                    }
                    createdAt
                }
            }
        }
    }
`;
