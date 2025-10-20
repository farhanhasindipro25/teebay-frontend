import { useQuery } from "@apollo/client/react";
import {
    Alert,
    Button,
    Container,
    Flex,
    Loader,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { GET_PRODUCTS_BY_USER } from "../../services/queries/productQueries";
import ProductCard from "../../components/ProductCard";

export default function UserProducts() {
    const currentUser = useCurrentUser();
    const userUid = currentUser?.uid;

    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_BY_USER, {
        variables: { userUid: userUid || "" },
        skip: !userUid,
    });

    if (!userUid) {
        return (
            <Container size="xl" py="xl">
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Authentication Required"
                    color="yellow"
                >
                    Please log in to view your products
                </Alert>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container size="xl" py="xl">
                <Flex
                    justify="center"
                    align="center"
                    style={{ minHeight: "60vh" }}
                >
                    <Loader size="lg" />
                </Flex>
            </Container>
        );
    }

    if (error) {
        return (
            <Container size="xl" py="xl">
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Error"
                    color="red"
                >
                    Failed to load your products: {error.message}
                </Alert>
            </Container>
        );
    }

    const products = Array.isArray(data?.productsByUser?.data)
        ? data.productsByUser.data
        : [];

    return (
        <Container size="xl" py="xl">
            <Flex justify="space-between" align="center" mb="xl">
                <Title order={3}>My Products</Title>
                <Button color="indigo" leftSection={<IconPlus size={20} />}>
                    Add Product
                </Button>
            </Flex>

            <Stack gap="md">
                {products.map((product) => (
                    <ProductCard
                        refetch={refetch}
                        key={product.uid}
                        product={product}
                    />
                ))}
            </Stack>

            {products.length === 0 && (
                <Stack align="center" py="xl" gap="md">
                    <Text size="lg" c="dimmed">
                        You haven't added any products yet
                    </Text>
                    <Button leftSection={<IconPlus size={20} />}>
                        Add Your First Product
                    </Button>
                </Stack>
            )}
        </Container>
    );
}
