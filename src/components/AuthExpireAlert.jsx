import { Alert, Container } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function AuthExpireAlert() {
    return (
        <Container size="xl" py="xl">
            <Alert
                icon={<IconAlertCircle size={16} />}
                title="Authentication Required"
                color="yellow"
            >
                Session Expired! Please log in again to continue.
            </Alert>
        </Container>
    );
}
