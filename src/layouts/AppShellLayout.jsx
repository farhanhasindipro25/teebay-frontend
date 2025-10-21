import { AppShell, Avatar, Group, Menu, NavLink, Text } from "@mantine/core";
import {
    IconBrandProducthunt,
    IconLogout,
    IconPlus,
    IconShoppingCart,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, useCurrentUser } from "../hooks/useCurrentUser";
import { CREATE_PRODUCT, MY_PRODUCTS, PRODUCTS } from "../constants/appUrls";

export default function AppShellLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useCurrentUser();

    const navItems = [
        {
            label: "My Products",
            icon: <IconShoppingCart size={20} />,
            path: MY_PRODUCTS,
        },
        {
            label: "All Products",
            icon: <IconBrandProducthunt size={20} />,
            path: PRODUCTS,
        },
        {
            label: "Add Products",
            icon: <IconPlus size={20} />,
            path: CREATE_PRODUCT,
        },
    ];

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 250, breakpoint: "sm" }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Text size="xl" fw={700} c="indigo">
                        Teebay
                    </Text>

                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Avatar
                                radius="xl"
                                style={{ cursor: "pointer" }}
                                color="indigo"
                            >
                                {getInitials(currentUser?.name)}
                            </Avatar>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>
                                {currentUser?.name || "User"}
                            </Menu.Label>
                            <Menu.Divider />
                            <Menu.Item
                                leftSection={<IconLogout size={16} />}
                                color="red"
                                onClick={handleLogout}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Text size="sm" fw={500} c="dimmed" mb="md">
                    User Menu
                </Text>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        label={item.label}
                        leftSection={item.icon}
                        active={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                        mb="xs"
                    />
                ))}
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
