import { useMutation, useQuery } from "@apollo/client/react";
import {
    Alert,
    Badge,
    Button,
    Container,
    Flex,
    Group,
    Modal,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    IconAlertCircle,
    IconCalendar,
    IconChevronLeft,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBox from "../../components/ErrorBox";
import GlobalInitialPageLoader from "../../components/GlobalInitialPageLoader";
import { MY_TRANSACTIONS, PRODUCTS } from "../../constants/appUrls";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { BUY_PRODUCT } from "../../services/mutations/transactionMutations";
import { GET_PRODUCT } from "../../services/queries/productQueries";
import { GetDateInDayMonthYearFormat } from "../../utils/dateFormatters";
import ProductRentModal from "./components/ProductRentModal";

export default function ProductDetails() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [rentModalOpen, setRentModalOpen] = useState(false);

    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { uid },
    });

    const [buyProduct, { loading: buyLoading }] = useMutation(BUY_PRODUCT, {
        onCompleted: (data) => {
            if (data?.buyProduct?.success) {
                setConfirmModalOpen(false);
                notifications.show({
                    title: "Success!",
                    message:
                        data.buyProduct.message ||
                        "Product purchased successfully!",
                    color: "green",
                });
                navigate(MY_TRANSACTIONS);
            }
        },
        onError: (error) => {
            notifications.show({
                title: "Purchase Failed",
                message:
                    error.message ||
                    "An error occurred while purchasing the product",
                color: "red",
            });
        },
        refetchQueries: [{ query: GET_PRODUCT, variables: { uid } }],
    });

    const handleBuyProduct = () => {
        buyProduct({
            variables: {
                buyProductInput: {
                    productUid: uid,
                    buyerUid: currentUser.uid,
                },
            },
        });
    };

    const handleRentSuccess = () => {
        navigate(MY_TRANSACTIONS);
    };

    if (loading) return <GlobalInitialPageLoader />;

    if (error) return <ErrorBox message={error.message} />;

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

    const isDisabled =
        currentUser.uid === product.createdByInfo.uid ||
        product.isBought === true ||
        product.isRented === true;

    return (
        <>
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
                    <Flex gap={10} align="center">
                        {product.isBought && <Badge color="violet">SOLD</Badge>}
                        {product.isRented && (
                            <Badge color="blue">ON RENT</Badge>
                        )}
                        {!product.isRented && !product.isBought && (
                            <Badge color="green">IN STOCK</Badge>
                        )}
                    </Flex>
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

                    {product.rentalPrice && (
                        <Text size="lg" fw={500}>
                            Rental: ${product.rentalPrice}
                            {product.rentalType && ` / ${product.rentalType}`}
                        </Text>
                    )}

                    <div>
                        <Text size="lg" fw={500} mb="sm">
                            Description
                        </Text>
                        <Text
                            style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}
                        >
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

                    <Flex gap="md" justify="flex-end">
                        <Button
                            disabled={isDisabled}
                            variant="outline"
                            color="indigo"
                            size="md"
                            onClick={() => setRentModalOpen(true)}
                        >
                            Rent
                        </Button>
                        <Button
                            disabled={isDisabled}
                            size="md"
                            color="indigo"
                            onClick={() => setConfirmModalOpen(true)}
                        >
                            Buy
                        </Button>
                    </Flex>
                </Stack>
            </Container>

            <Modal
                opened={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                title="Confirm Purchase"
                centered
            >
                <Stack gap="md">
                    <Text>
                        Are you sure you want to buy{" "}
                        <strong>{product.title}</strong> for{" "}
                        <strong>${product.price}</strong>?
                    </Text>
                    <Flex gap="sm" justify="flex-end">
                        <Button
                            variant="subtle"
                            color="gray"
                            onClick={() => setConfirmModalOpen(false)}
                            disabled={buyLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="indigo"
                            onClick={handleBuyProduct}
                            loading={buyLoading}
                        >
                            Confirm Purchase
                        </Button>
                    </Flex>
                </Stack>
            </Modal>

            <ProductRentModal
                opened={rentModalOpen}
                onClose={() => setRentModalOpen(false)}
                product={product}
                currentUserUid={currentUser.uid}
                onSuccess={handleRentSuccess}
            />
        </>
    );
}
