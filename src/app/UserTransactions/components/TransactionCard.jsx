import { Card, Text, Title, Divider } from "@mantine/core";
import dayjs from "dayjs";
import { GetDateInDayMonthYearFormat } from "../../../utils/dateFormatters";

export default function TransactionCard({ transaction, viewType }) {
    const { productInfo, buyerInfo, sellerInfo, createdAt, type } = transaction;

    const isRental = type === "RENTAL";

    const viewConfig = {
        bought: { label: "Seller", counterpart: sellerInfo },
        borrowed: { label: "Lender", counterpart: sellerInfo },
        sold: { label: "Buyer", counterpart: buyerInfo },
        lent: { label: "Borrower", counterpart: buyerInfo },
    };

    const { label, counterpart } = viewConfig[viewType] || {};

    return (
        <Card shadow="sm" radius="md" withBorder>
            <Title order={6} mb={6}>
                {productInfo.title}
            </Title>

            {isRental ? (
                <>
                    <Text fw={600} size="sm">
                        Rental Price: ${productInfo.rentalPrice} (
                        {productInfo.rentalType})
                    </Text>
                    <Text size="sm" c="dimmed">
                        Rent Duration:{" "}
                        {dayjs(productInfo.rentStartsAt).format("DD MMM YY")} -{" "}
                        {dayjs(productInfo.rentEndsAt).format("DD MMM YY")}
                    </Text>
                </>
            ) : (
                <Text fw={600} size="sm">
                    Price: ${productInfo.price}
                </Text>
            )}

            <Divider my="sm" />

            <div>
                <Text fw={600} size="sm">
                    {label}:
                </Text>
                <Text size="sm" mt={2}>
                    {counterpart?.name || "Unknown"}
                </Text>
                <Text size="sm" c="dimmed">
                    {counterpart?.email || "No email available"}
                </Text>
            </div>

            <Text size="xs" c="dimmed" mt="sm">
                Transaction Date: {GetDateInDayMonthYearFormat(createdAt)}
            </Text>
        </Card>
    );
}
