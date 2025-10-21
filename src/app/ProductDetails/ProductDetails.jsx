import { useQuery } from "@apollo/client/react";
import {
    Alert,
    Button,
    Container,
    Flex,
    Group,
    Loader,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconCalendar,
    IconChevronLeft,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT } from "../../services/queries/productQueries";
import { GetDateInDayMonthYearFormat } from "../../utils/dateFormatters";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { PRODUCTS } from "../../constants/appUrls";

export default function ProductDetails() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { uid },
    });

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
                    Failed to load product: {error.message}
                </Alert>
            </Container>
        );
    }

    const product = data?.product?.data;

    if (!product) {
        return (
            <Container size="xl" py="xl">
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Not Found"
                    color="yellow"
                >
                    Product not found
                </Alert>
            </Container>
        );
    }

    return (
        <Container size="md" py="xl">
            <Button
                variant="subtle"
                leftSection={<IconChevronLeft size={14} />}
                c="indigo"
                size="xs"
                mb={10}
                onClick={() => navigate(PRODUCTS)}
            >
                Go Back
            </Button>
            <Stack gap="lg">
                <Title order={3}>{product.title}</Title>

                <Text size="sm" c="dimmed">
                    Categories:{" "}
                    {product.categories?.length
                        ? product.categories
                              .map((c) => c.replace("_", " "))
                              .join(", ")
                        : "Uncategorized"}
                </Text>
                <Title order={3} c="dark">
                    Price: ${product.price}
                </Title>

                <div>
                    <Text size="lg" fw={500} mb="sm">
                        Description
                    </Text>
                    <Text style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                        {product.description}
                    </Text>
                </div>

                <Group gap="xs">
                    <IconCalendar size={16} />
                    <Text size="sm" c="dimmed">
                        Date posted:{" "}
                        {GetDateInDayMonthYearFormat(product.createdAt)}
                    </Text>
                </Group>

                {currentUser.uid === product.createdByInfo.uid && (
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="You cannot buy or rent your own product"
                        color="indigo"
                    />
                )}

                {product.isBought === true && (
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="This product is already bought"
                        color="orange"
                    />
                )}
                {product.isRented === true && (
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="This product is already rented"
                        color="yellow"
                    />
                )}

                <Flex gap="md" justify="flex-end">
                    <Button
                        disabled={
                            currentUser.uid === product.createdByInfo.uid ||
                            product.isBought === true ||
                            product.isRented === true
                        }
                        variant="outline"
                        color="indigo"
                        size="md"
                    >
                        Rent
                    </Button>
                    <Button
                        disabled={
                            currentUser.uid === product.createdByInfo.uid ||
                            product.isBought === true ||
                            product.isRented === true
                        }
                        size="md"
                        color="indigo"
                    >
                        Buy
                    </Button>
                </Flex>
            </Stack>
        </Container>
    );
}
