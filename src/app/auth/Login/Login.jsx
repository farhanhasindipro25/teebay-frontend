import { useMutation } from "@apollo/client/react";
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
import { notifications } from "@mantine/notifications";
import { yupResolver } from "mantine-form-yup-resolver";
import { Link } from "react-router-dom";
import { currentUserVar } from "../../../providers/ApolloProvider";
import { LOGIN } from "../../../services/mutations/authMutations";
import { loginSchema } from "../../../validators/authValidators";

export default function Login() {
    const [login, { loading }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            if (data.login.success) {
                const user = data.login.user;

                currentUserVar({
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                });

                localStorage.setItem("userId", user.id);
                localStorage.setItem("userUid", user.uid);
                localStorage.setItem("userEmail", user.email);

                notifications.show({
                    title: `Welcome Back ${user.name}`,
                    message: "You have successfully logged in!",
                    color: "green",
                });
            } else {
                notifications.show({
                    title: "Login Failed",
                    message: "Invalid credentials",
                    color: "red",
                });
            }
        },
        onError: (error) => {
            notifications.show({
                title: "Error",
                message: error.message || "An error occurred during login.",
                color: "red",
            });
        },
    });

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: yupResolver(loginSchema),
    });

    const handleSubmit = async (values) => {
        try {
            await login({
                variables: {
                    loginInput: {
                        email: values.email,
                        password: values.password,
                    },
                },
            });
        } catch (error) {
            console.error("Login error:", error);
        }
    };

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

                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                        Don't have an account?{" "}
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
