import { Card, Title, Text, Group } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { GetDateInDayMonthYearFormat } from "../utils/dateFormatters";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.uid}`);
    };
    return (
        <Card
            shadow="sm"
            padding="lg"
            withBorder
            style={{
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
            <Title order={2} size="h4" mb="xs">
                {product.title}
            </Title>

            <Text size="sm" c="dimmed" mb="xs">
                Categories: {product.categories?.join(", ") || "Uncategorized"}
            </Text>

            <Text size="sm" c="dark" mb="md">
                Price: ${product.price} | Rent: ${product.rentalPrice}{" "}
                {product.rentalType.toLowerCase()}
            </Text>

            <Text mb="md" style={{ lineHeight: 1.6 }}>
                {product.description}
            </Text>

            <Group justify="space-between">
                <Group gap="xs">
                    <IconCalendar size={14} />
                    <Text size="sm" c="dimmed">
                        Date posted:{" "}
                        {GetDateInDayMonthYearFormat(product.createdAt)}
                    </Text>
                </Group>
            </Group>
        </Card>
    );
}
