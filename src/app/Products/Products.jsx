import { useQuery } from "@apollo/client/react";
import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import ErrorBox from "../../components/ErrorBox";
import GlobalInitialPageLoader from "../../components/GlobalInitialPageLoader";
import { GET_PRODUCTS } from "../../services/queries/productQueries";
import ProductCard from "./components/ProductCard";

export default function Products() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <GlobalInitialPageLoader />;

    if (error) return <ErrorBox message={error.message} />;

    const products = Array.isArray(data?.products?.data)
        ? data.products.data
        : [];

    return (
        <Container size="xl" py="xl">
            <Flex justify="space-between" align="center" mb="xl">
                <Title order={4}>All Products</Title>
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
