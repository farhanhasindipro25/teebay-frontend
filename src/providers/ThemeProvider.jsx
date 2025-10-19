import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

const theme = createTheme({
    fontFamily: "Plus Jakarta Sans, sans-serif",
    components: {
        Image: { defaultProps: { fallbackSrc: "/no-image.jpg" } },
        NumberInput: {
            defaultProps: {
                clampBehavior: "strict",
                min: 0,
                allowNegative: false,
            },
        },
        Select: {
            defaultProps: { limit: 50, radius: "sm" },
        },
        TextInput: {
            defaultProps: {
                radius: "sm",
            },
        },
        PasswordInput: {
            defaultProps: {
                radius: "sm",
            },
        },
        Textarea: {
            defaultProps: {
                radius: "sm",
            },
        },
        MultiSelect: {
            defaultProps: {
                radius: "sm",
            },
        },
        Input: {
            defaultProps: {
                radius: "sm",
            },
        },
        ActionIcon: {
            defaultProps: {
                radius: "sm",
            },
        },
        Button: {
            defaultProps: {
                radius: "sm",
            },
        },
    },
});

const ThemeProvider = ({ children }) => {
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <Notifications position="top-center" />
                {children}
            </ModalsProvider>
        </MantineProvider>
    );
};

export default ThemeProvider;
