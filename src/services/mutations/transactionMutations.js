import { gql } from "@apollo/client";

export const BUY_PRODUCT = gql`
    mutation BuyProduct($buyProductInput: BuyProductInput!) {
        buyProduct(buyProductInput: $buyProductInput) {
            success
            message
            transaction {
                id
                uid
                type
                productId
                productInfo {
                    id
                    uid
                    title
                    description
                    price
                    isBought
                    isRented
                    categories
                    createdAt
                    updatedAt
                }
                buyerId
                buyerInfo {
                    id
                    uid
                    name
                    email
                    phone
                    address
                }
                sellerId
                sellerInfo {
                    id
                    uid
                    name
                    email
                    phone
                    address
                }
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const RENT_PRODUCT = gql`
    mutation RentProduct($rentProductInput: RentProductInput!) {
        rentProduct(rentProductInput: $rentProductInput) {
            success
            message
            transaction {
                id
                uid
                type
                productInfo {
                    uid
                    title
                    price
                    rentalPrice
                    rentalType
                    rentStartsAt
                    rentEndsAt
                    isRented
                }
                buyerInfo {
                    uid
                    name
                    email
                }
                sellerInfo {
                    uid
                    name
                    email
                }
                createdAt
            }
        }
    }
`;
