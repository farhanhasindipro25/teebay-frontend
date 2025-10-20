import { AppShell, Button, Group, Text } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppShell header={{ height: 60 }}>
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Text
                        size="xl"
                        fw={700}
                        c="indigo"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Teebay
                    </Text>

                    <Group>
                        {location.pathname !== "/login" && (
                            <Button
                                variant="outline"
                                color="indigo"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                        )}
                        {location.pathname !== "/create-account" && (
                            <Button
                                variant="filled"
                                color="indigo"
                                onClick={() => navigate("/create-account")}
                            >
                                Create Account
                            </Button>
                        )}
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
