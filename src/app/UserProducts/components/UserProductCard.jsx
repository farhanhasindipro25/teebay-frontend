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
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@apollo/client/react";
import { GetDateInDayMonthYearFormat } from "../../../utils/dateFormatters";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { DELETE_PRODUCT } from "../../../services/mutations/productMutations";
import { modals } from "@mantine/modals";

export default function UserProductCard({ product, refetch }) {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();

    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
        onCompleted: (data) => {
            if (data.deleteProduct.success) {
                notifications.show({
                    title: "Deleted",
                    message:
                        data.deleteProduct.message ||
                        "Product deleted successfully",
                    color: "green",
                });
                refetch();
            } else {
                notifications.show({
                    title: "Error",
                    message:
                        data.deleteProduct.message ||
                        "Failed to delete product",
                    color: "red",
                });
            }
        },
        onError: (error) => {
            notifications.show({
                title: "Error",
                message: error.message || "Failed to delete product",
                color: "red",
            });
        },
    });

    const handleEdit = (e) => {
        navigate(`/my-products/edit/${product.uid}`);
    };

    const handleDelete = (e) => {
        if (!currentUser) return;

        modals.openConfirmModal({
            title: "Delete Product",
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete{" "}
                    <strong>{product.title}</strong>? This action cannot be
                    undone.
                </Text>
            ),
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red", loading },
            onConfirm: () => {
                deleteProduct({
                    variables: {
                        productUid: product.uid,
                        userUid: currentUser.uid,
                    },
                });
            },
        });
    };

    return (
        <Card shadow="sm" padding="lg" withBorder>
            <Flex justify="space-between" align="flex-start" mb="xs">
                <Title order={2} size="h4">
                    {product.title}
                </Title>

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
                            disabled={loading}
                        >
                            <IconTrash size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
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
