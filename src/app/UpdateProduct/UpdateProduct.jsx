import { useQuery } from "@apollo/client/react";
import {
    Button,
    Container,
    Group,
    MultiSelect,
    NumberInput,
    Select,
    Stack,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT } from "../../services/queries/productQueries";

const categoryOptions = [
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "FURNITURE", label: "Furniture" },
    { value: "HOME_APPLIANCES", label: "Home Appliances" },
    { value: "SPORTING_GOODS", label: "Sporting Goods" },
    { value: "OUTDOOR", label: "Outdoor" },
    { value: "TOYS", label: "Toys" },
];

const rentalTypeOptions = [
    { value: "HOURLY", label: "per hr" },
    { value: "DAILY", label: "per day" },
    { value: "WEEKLY", label: "per week" },
    { value: "MONTHLY", label: "per month" },
];

export default function UpdateProduct() {
    const { uid } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { uid },
    });

    return (
        <Container size="sm" py="xl">
            <form>
                <Stack gap="lg">
                    <Title order={2}>Edit Product</Title>

                    <TextInput
                        label="Title"
                        placeholder="Enter product title"
                        required
                    />

                    <MultiSelect
                        label="Categories"
                        placeholder="Select categories"
                        data={categoryOptions}
                        required
                        searchable
                    />

                    <Textarea
                        label="Description"
                        placeholder="Enter product description"
                        required
                        minRows={6}
                    />

                    <Group grow align="flex-start">
                        <NumberInput
                            label="Price"
                            placeholder="$1000"
                            required
                            min={0}
                            prefix="$"
                        />
                        <NumberInput
                            label="Rent"
                            placeholder="$400"
                            required
                            min={0}
                            prefix="$"
                        />
                        <Select
                            label="Rental Type"
                            data={rentalTypeOptions}
                            placeholder="Select Rental Type"
                            required
                        />
                    </Group>

                    <Group justify="flex-end" gap="md">
                        <Button
                            variant="outline"
                            c="indigo"
                            onClick={() => navigate("/my-products")}
                        >
                            Go Back
                        </Button>
                        <Button type="submit" color="indigo">
                            Edit Product
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Container>
    );
}
