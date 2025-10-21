import { Alert, Container } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function ErrorBox({ message }) {
    return (
        <Container size="xl" py="xl">
            <Alert
                icon={<IconAlertCircle size={16} />}
                title="Error"
                color="red"
            >
                Failed to load your products: {message}
            </Alert>
        </Container>
    );
}
