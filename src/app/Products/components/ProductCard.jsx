import { Badge, Card, Flex, Group, Space, Text, Title } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { GetDateInDayMonthYearFormat } from "../../../utils/dateFormatters";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.uid}`);
    };

    return (
        <Card
            onClick={handleClick}
            shadow="sm"
            padding="lg"
            style={{
                cursor: "pointer",
            }}
            withBorder
        >
            <Title order={2} size="h4">
                {product.title}
            </Title>
            <Space py={4} />
            <Flex gap={10} align="center">
                {product.isBought && <Badge color="violet">SOLD</Badge>}
                {product.isRented && <Badge color="blue">ON RENT</Badge>}
                {!product.isRented && !product.isBought && (
                    <Badge color="green">IN STOCK</Badge>
                )}
            </Flex>
            <Space py={4} />
            <Text size="sm" c="dimmed" mb="xs">
                Categories:{" "}
                {product.categories?.length
                    ? product.categories
                          .map((c) => c.replace("_", " "))
                          .join(", ")
                    : "Uncategorized"}
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
                <Group gap="xs">
                    <IconCalendar size={14} />
                    <Text size="sm" c="dimmed">
                        Posted By: {product.createdByInfo?.name}
                    </Text>
                </Group>
            </Group>
        </Card>
    );
}
