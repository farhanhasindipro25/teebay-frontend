import { useQuery, useMutation } from "@apollo/client/react";
import {
    Alert,
    Button,
    Container,
    Flex,
    Group,
    Loader,
    MultiSelect,
    NumberInput,
    Select,
    Stack,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT } from "../../services/queries/productQueries";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { UPDATE_PRODUCT } from "../../services/mutations/productMutations";
import { notifications } from "@mantine/notifications";
import { yupResolver } from "mantine-form-yup-resolver";
import { productSchema } from "../../validators/productValidator";

const categoryOptions = [
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "FURNITURE", label: "Furniture" },
    { value: "HOME_APPLIANCES", label: "Home Appliances" },
    { value: "SPORTING_GOODS", label: "Sporting Goods" },
    { value: "OUTDOOR", label: "Outdoor" },
    { value: "TOYS", label: "Toys" },
];

const rentalTypeOptions = [
    { value: "HOURLY", label: "per hr" },
    { value: "DAILY", label: "per day" },
    { value: "WEEKLY", label: "per week" },
    { value: "MONTHLY", label: "per month" },
];

export default function UpdateProduct() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const currentUser = useCurrentUser();

    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { uid },
    });

    const [updateProduct, { loading: updating, error: updateError }] =
        useMutation(UPDATE_PRODUCT, {
            onCompleted: (data) => {
                notifications.show({
                    title: "Success",
                    message:
                        data?.updateProduct?.message ||
                        "Product updated successfully!",
                    color: "green",
                });
                navigate("/my-products");
            },
            onError: (error) => {
                notifications.show({
                    title: "Error",
                    message: error.message || "Failed to update product",
                    color: "red",
                });
            },
        });

    const form = useForm({
        initialValues: {
            title: "",
            categories: [],
            description: "",
            price: 0,
            rentalPrice: 0,
            rentalType: "DAILY",
        },
        validate: yupResolver(productSchema),
    });

    useEffect(() => {
        if (data?.product?.data) {
            const product = data.product.data;
            form.setValues({
                title: product.title || "",
                categories: product.categories || [],
                description: product.description || "",
                price: product.price || 0,
                rentalPrice: product.rentalPrice || 0,
                rentalType: product.rentalType || "DAILY",
            });
        }
    }, [data]);

    const handleSubmit = (values) => {
        updateProduct({
            variables: {
                updateProductInput: {
                    productUid: uid,
                    userUid: currentUser.uid,
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    rentalPrice: values.rentalPrice,
                    rentalType: values.rentalType,
                    categories: values.categories,
                },
            },
        });
    };

    if (loading) {
        return (
            <Container size="sm" py="xl">
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
            <Container size="sm" py="xl">
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

    if (!data?.product?.data) {
        return (
            <Container size="sm" py="xl">
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
        <Container size="sm" py="xl">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="lg">
                    <Title order={2}>Edit Product</Title>

                    {updateError && (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Update Error"
                            color="red"
                        >
                            {updateError.message}
                        </Alert>
                    )}

                    <TextInput
                        label="Title"
                        placeholder="Enter product title"
                        required
                        {...form.getInputProps("title")}
                    />

                    <MultiSelect
                        label="Categories"
                        placeholder="Select categories"
                        data={categoryOptions}
                        required
                        searchable
                        {...form.getInputProps("categories")}
                    />

                    <Textarea
                        label="Description"
                        placeholder="Enter product description"
                        required
                        minRows={6}
                        {...form.getInputProps("description")}
                    />

                    <Group grow align="flex-start">
                        <NumberInput
                            label="Price"
                            placeholder="$1000"
                            required
                            min={0}
                            prefix="$"
                            {...form.getInputProps("price")}
                        />
                        <NumberInput
                            label="Rent"
                            placeholder="$400"
                            required
                            min={0}
                            prefix="$"
                            {...form.getInputProps("rentalPrice")}
                        />
                        <Select
                            label="Rental Type"
                            data={rentalTypeOptions}
                            placeholder="Select Rental Type"
                            required
                            {...form.getInputProps("rentalType")}
                        />
                    </Group>

                    <Group justify="flex-end" gap="md">
                        <Button
                            variant="outline"
                            c="indigo"
                            onClick={() => navigate("/my-products")}
                            disabled={updating}
                        >
                            Go Back
                        </Button>
                        <Button type="submit" color="indigo" loading={updating}>
                            Edit Product
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Container>
    );
}
