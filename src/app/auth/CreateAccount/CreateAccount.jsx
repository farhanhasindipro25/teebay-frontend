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
import { createAccountSchema } from "./validator/createAccountSchema";

export default function CreateAccount() {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        validate: yupResolver(createAccountSchema),
    });

    return (
        <Box maw={800} mx="auto" mt={80}>
            <Card shadow="sm" p="xl" radius="md" withBorder>
                <Title order={3} ta="center" mb="lg">
                    CREATE ACCOUNT
                </Title>

                <form>
                    <Flex gap="md" direction={{ base: "column", sm: "row" }}>
                        <TextInput
                            label="First Name"
                            placeholder="e.g. Farhan"
                            flex={1}
                            {...form.getInputProps("firstName")}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="e.g. Hasin"
                            flex={1}
                            {...form.getInputProps("lastName")}
                        />
                    </Flex>

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

                    <Button fullWidth mt="xl" type="submit" color="indigo">
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
