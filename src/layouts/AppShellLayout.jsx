import { useNavigate } from "react-router-dom";

export default function AppShellLayout({ children }) {
    const navigate = useNavigate();

    const navItems = [];

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 250, breakpoint: "sm" }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Text size="xl" fw={700}>
                        Teebay
                    </Text>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                {navItems.map((item) => console.log(item))}
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
