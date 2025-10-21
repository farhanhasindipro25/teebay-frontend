import { useQuery } from "@apollo/client/react";
import {
    Alert,
    Container,
    Flex,
    Loader,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { GET_PRODUCTS } from "../../services/queries/productQueries";
import ProductCard from "./components/ProductCard";

export default function Products() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

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
                    Failed to load products: {error.message}
                </Alert>
            </Container>
        );
    }

    const products = Array.isArray(data?.products?.data)
        ? data.products.data
        : [];

    return (
        <Container size="xl" py="xl">
            <Flex justify="space-between" align="center" mb="xl">
                <Title order={3}>All Products</Title>
            </Flex>

            <Stack gap="md">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Stack>

            {products.length === 0 && (
                <Stack align="center" py="xl" gap="md">
                    <Text size="lg" c="dimmed">
                        No products found
                    </Text>
                </Stack>
            )}
        </Container>
    );
}
