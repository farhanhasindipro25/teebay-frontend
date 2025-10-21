import { Container, Flex, Loader } from "@mantine/core";

export default function GlobalInitialPageLoader() {
    return (
        <Container size="xl" py="xl">
            <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
                <Loader size="lg" />
            </Flex>
        </Container>
    );
}
