import {
    Card,
    Title,
    Text,
    Group,
    ActionIcon,
    Flex,
    Tooltip,
} from "@mantine/core";
import { IconCalendar, IconEdit, IconTrash } from "@tabler/icons-react";
import { GetDateInDayMonthYearFormat } from "../utils/dateFormatters";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();

    const handleClick = () => {
        navigate(`/products/${product.uid}`);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/my-products/edit/${product.uid}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
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
            <Flex justify="space-between" align="flex-start" mb="xs">
                <Title order={2} size="h4" style={{ flex: 1 }}>
                    {product.title}
                </Title>

                {currentUser && (
                    <Group gap="xs" onClick={(e) => e.stopPropagation()}>
                        <Tooltip label="Edit Product">
                            <ActionIcon
                                variant="subtle"
                                color="indigo"
                                onClick={handleEdit}
                            >
                                <IconEdit size={18} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete Product">
                            <ActionIcon
                                variant="subtle"
                                color="red"
                                onClick={handleDelete}
                            >
                                <IconTrash size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                )}
            </Flex>

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
            </Group>
        </Card>
    );
}
