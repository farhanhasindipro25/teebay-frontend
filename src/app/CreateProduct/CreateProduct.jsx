import { useMutation } from "@apollo/client/react";
import {
    Button,
    Container,
    Flex,
    Group,
    MultiSelect,
    NumberInput,
    Select,
    Stack,
    Stepper,
    Text,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { yupResolver } from "mantine-form-yup-resolver";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { CREATE_PRODUCT } from "../../services/mutations/productMutations";
import { productSchema } from "../../validators/productValidator";

export default function CreateProduct() {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const currentUser = useCurrentUser();

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

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            price: "",
            rentalPrice: "",
            rentalType: "",
            categories: [],
        },
        validate: yupResolver(productSchema),
    });

    const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
        onCompleted: (data) => {
            notifications.show({
                title: "Success!",
                message: `Product created successfully`,
                color: "green",
                autoClose: 5000,
            });

            form.reset();
            navigate("/my-products");
        },
        onError: (error) => {
            notifications.show({
                title: "Error",
                message: error.message || "Failed to create product",
                color: "red",
                autoClose: 5000,
            });
        },
    });

    const nextStep = () => setActive((current) => Math.min(current + 1, 5));
    const prevStep = () => setActive((current) => Math.max(current - 1, 0));
    const handleChange = (field, value) =>
        form.setValues({ ...form.values, [field]: value });

    const handleSubmit = async (values) => {
        try {
            await createProduct({
                variables: {
                    createProductInput: {
                        title: values.title,
                        description: values.description,
                        price: Number(values.price),
                        rentalPrice: Number(values.rentalPrice),
                        rentalType: values.rentalType,
                        categories: values.categories,
                        userUid: currentUser.uid,
                    },
                },
            });
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <Container size="sm" mt="xl">
            <Title order={3} ta="center" mb="xl">
                Add New Product
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stepper
                    active={active}
                    onStepClick={setActive}
                    breakpoint="sm"
                >
                    <Stepper.Step label="Title">
                        <Stack align="center">
                            <TextInput
                                w="100%"
                                withAsterisk
                                label="Product title"
                                placeholder="Enter title"
                                {...form.getInputProps("title")}
                                onChange={(e) =>
                                    handleChange("title", e.target.value)
                                }
                            />
                            <Group justify="center" mt="md">
                                <Button
                                    c="indigo"
                                    variant="outline"
                                    onClick={nextStep}
                                    disabled={!form.values.title}
                                >
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Description">
                        <Stack align="center">
                            <Textarea
                                w="100%"
                                withAsterisk
                                label="Description"
                                placeholder="Enter product description"
                                minRows={4}
                                {...form.getInputProps("description")}
                                onChange={(e) =>
                                    handleChange("description", e.target.value)
                                }
                            />
                            <Group justify="center" mt="md">
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    c="indigo"
                                    variant="outline"
                                    onClick={nextStep}
                                    disabled={!form.values.description}
                                >
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Price">
                        <Stack align="center">
                            <NumberInput
                                w="100%"
                                withAsterisk
                                label="Price"
                                placeholder="Enter price"
                                {...form.getInputProps("price")}
                                onChange={(value) =>
                                    handleChange("price", value)
                                }
                            />
                            <Flex justify="space-between" w="100%" gap={20}>
                                <NumberInput
                                    w="50%"
                                    withAsterisk
                                    label="Rental Price"
                                    placeholder="Enter rental price"
                                    {...form.getInputProps("rentalPrice")}
                                    onChange={(value) =>
                                        handleChange("rentalPrice", value)
                                    }
                                />
                                <Select
                                    w="50%"
                                    withAsterisk
                                    label="Rental Type"
                                    placeholder="Select rental type"
                                    data={rentalTypeOptions}
                                    {...form.getInputProps("rentalType")}
                                    onChange={(value) =>
                                        handleChange("rentalType", value)
                                    }
                                />
                            </Flex>
                            <Group justify="center" mt="md">
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    c="indigo"
                                    variant="outline"
                                    disabled={!form.values.price}
                                >
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Category">
                        <Stack align="center">
                            <MultiSelect
                                w="100%"
                                withAsterisk
                                label="Categories"
                                placeholder="Select categories"
                                data={categoryOptions}
                                {...form.getInputProps("categories")}
                                onChange={(value) =>
                                    handleChange("categories", value)
                                }
                            />
                            <Group justify="center" mt="md">
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    c="indigo"
                                    variant="outline"
                                    disabled={!form.values.categories}
                                >
                                    Next
                                </Button>
                            </Group>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Completed>
                        <Stack align="center">
                            <Text fw={600}>Summary</Text>
                            <Stack gap="sm" mt="md">
                                <Stack gap={2}>
                                    <Text fw={400} size="sm">
                                        Title
                                    </Text>
                                    <Text fw={600}>
                                        {form.values.title || "-"}
                                    </Text>
                                </Stack>

                                <Stack gap={2}>
                                    <Text fw={400} size="sm">
                                        Description
                                    </Text>
                                    <Text fw={600}>
                                        {form.values.description || "-"}
                                    </Text>
                                </Stack>

                                <Stack gap={2}>
                                    <Text fw={400} size="sm">
                                        Price
                                    </Text>
                                    <Text fw={600}>
                                        {form.values.price
                                            ? `${form.values.price}`
                                            : "-"}
                                    </Text>
                                </Stack>

                                <Stack gap={2}>
                                    <Text fw={400} size="sm">
                                        Rental Price
                                    </Text>
                                    <Text fw={600}>
                                        {form.values.rentalPrice
                                            ? `${form.values.rentalPrice} (${
                                                  form.values.rentalType ||
                                                  "N/A"
                                              })`
                                            : "-"}
                                    </Text>
                                </Stack>

                                <Stack gap={2}>
                                    <Text fw={400} size="sm">
                                        Categories
                                    </Text>
                                    <Text fw={600}>
                                        {form.values.categories.length > 0
                                            ? form.values.categories
                                                  .map((c) =>
                                                      c
                                                          .replace(/_/g, " ")
                                                          .toLowerCase()
                                                          .replace(
                                                              /\b\w/g,
                                                              (l) =>
                                                                  l.toUpperCase()
                                                          )
                                                  )
                                                  .join(", ")
                                            : "-"}
                                    </Text>
                                </Stack>
                            </Stack>
                            <Group justify="center" mt="md">
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    color="indigo"
                                    type="submit"
                                    loading={loading}
                                >
                                    Submit
                                </Button>
                            </Group>
                        </Stack>
                    </Stepper.Completed>
                </Stepper>
            </form>
        </Container>
    );
}
