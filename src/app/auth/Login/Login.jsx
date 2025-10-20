import {
    Button,
    Group,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "./validator/loginSchema";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: yupResolver(loginSchema),
    });

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9fafb",
            }}
        >
            <Paper
                shadow="sm"
                p="xl"
                radius="md"
                withBorder
                style={{ width: 380 }}
            >
                <Title order={3} ta="center" mb="md">
                    LOGIN
                </Title>

                <form>
                    <Stack>
                        <TextInput
                            label="Email"
                            placeholder="name@example.com"
                            {...form.getInputProps("email")}
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Enter Password"
                            {...form.getInputProps("password")}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            color="indigo"
                            loading={loading}
                        >
                            LOGIN
                        </Button>
                    </Stack>
                </form>

                <Group justify="center" mt="md">
                    <Text size="sm">
                        Don’t have an account?{" "}
                        <Link
                            to="/create-account"
                            style={{
                                color: "rgb(99, 102, 241)",
                                textDecoration: "none",
                                fontWeight: 500,
                            }}
                        >
                            Let's Create One
                        </Link>
                    </Text>
                </Group>
            </Paper>
        </div>
    );
}
