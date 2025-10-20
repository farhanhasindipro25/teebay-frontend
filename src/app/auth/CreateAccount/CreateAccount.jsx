import {
    Box,
    Button,
    Card,
    Flex,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { notifications } from "@mantine/notifications";

import { createAccountSchema } from "../../../validators/authValidators";
import { CREATE_USER } from "../../../mutations/authMutations";

export default function CreateAccount() {
    const navigate = useNavigate();

    const [createUser, { loading }] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            if (data.createUser.success) {
                const user = data.createUser.data;

                notifications.show({
                    title: "Success",
                    message:
                        data.createUser.message ||
                        "Your account has been created successfully! Please login to continue.",
                    color: "green",
                });
                navigate("/login");
            }
        },
        onError: (error) => {
            notifications.show({
                title: "Error",
                message:
                    error.message ||
                    "An error occurred while creating your account.",
                color: "red",
            });
        },
    });

    const form = useForm({
        initialValues: {
            name: "",
            address: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        validate: yupResolver(createAccountSchema),
    });

    const handleSubmit = async (values) => {
        try {
            await createUser({
                variables: {
                    createUserInput: {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        phone: values.phone,
                        address: values.address,
                    },
                },
            });
        } catch (error) {
            console.error(
                "An error occurred while creating your account:",
                error
            );
        }
    };

    return (
        <Box maw={800} mx="auto" mt={80}>
            <Card shadow="sm" p="xl" radius="md" withBorder>
                <Title order={3} ta="center" mb="lg">
                    CREATE ACCOUNT
                </Title>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Name"
                        placeholder="e.g. Farhan Hasin"
                        {...form.getInputProps("name")}
                    />

                    <TextInput
                        mt="md"
                        label="Address"
                        placeholder="Enter your address"
                        {...form.getInputProps("address")}
                    />

                    <Flex
                        mt="md"
                        gap="md"
                        direction={{ base: "column", sm: "row" }}
                    >
                        <TextInput
                            label="Email"
                            placeholder="name@example.com"
                            flex={1}
                            {...form.getInputProps("email")}
                        />
                        <TextInput
                            label="Phone Number"
                            placeholder="e.g. 01731441024"
                            flex={1}
                            {...form.getInputProps("phone")}
                        />
                    </Flex>

                    <PasswordInput
                        mt="md"
                        label="Password"
                        placeholder="Enter your password"
                        {...form.getInputProps("password")}
                    />
                    <PasswordInput
                        mt="md"
                        label="Confirm Password"
                        placeholder="Re-type your password"
                        {...form.getInputProps("confirmPassword")}
                    />

                    <Button
                        fullWidth
                        mt="xl"
                        type="submit"
                        color="indigo"
                        loading={loading}
                    >
                        CREATE ACCOUNT
                    </Button>
                </form>

                <Text ta="center" mt="md">
                    Already have an account?{" "}
                    <Text
                        component={Link}
                        to="/login"
                        fw={600}
                        c="indigo"
                        style={{ textDecoration: "none" }}
                    >
                        Login
                    </Text>
                </Text>
            </Card>
        </Box>
    );
}
