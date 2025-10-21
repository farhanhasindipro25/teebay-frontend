import { useQuery } from "@apollo/client/react";
import { Button, Container, Flex, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import AuthExpireAlert from "../../components/AuthExpireAlert";
import ErrorBox from "../../components/ErrorBox";
import GlobalInitialPageLoader from "../../components/GlobalInitialPageLoader";
import { CREATE_PRODUCT } from "../../constants/appUrls";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { GET_PRODUCTS_BY_USER } from "../../services/queries/productQueries";
import UserProductCard from "./components/UserProductCard";

export default function UserProducts() {
    const currentUser = useCurrentUser();
    const navigate = useNavigate();
    const userUid = currentUser?.uid;

    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_BY_USER, {
        variables: { userUid: userUid || "" },
        skip: !userUid,
    });

    if (!userUid) return <AuthExpireAlert />;

    if (loading) return <GlobalInitialPageLoader />;

    if (error) return <ErrorBox message={error.message} />;

    const products = Array.isArray(data?.productsByUser?.data)
        ? data.productsByUser.data
        : [];

    return (
        <Container size="xl" py="xl">
            <Flex justify="space-between" align="center" mb="xl">
                <Title order={4}>My Products</Title>
                <Button
                    onClick={() => navigate(CREATE_PRODUCT)}
                    color="indigo"
                    leftSection={<IconPlus size={20} />}
                >
                    Add Product
                </Button>
            </Flex>

            <Stack gap="md">
                {products.map((product) => (
                    <UserProductCard
                        refetch={refetch}
                        key={product.uid}
                        product={product}
                    />
                ))}
            </Stack>

            {products.length === 0 && (
                <Stack align="center" py="xl" gap="md">
                    <Text size="md" c="dimmed">
                        You haven't added any products yet
                    </Text>
                </Stack>
            )}
        </Container>
    );
}
