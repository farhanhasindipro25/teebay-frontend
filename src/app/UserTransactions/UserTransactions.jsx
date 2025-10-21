import { useQuery } from "@apollo/client/react";
import { Badge, Container, Flex, Tabs, Text, Title } from "@mantine/core";
import { GET_USER_TRANSACTIONS } from "../../services/queries/transactionQueries";
import GlobalInitialPageLoader from "../../components/GlobalInitialPageLoader";
import ErrorBox from "../../components/ErrorBox";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import TransactionList from "./components/TransactionList";
export default function UserTransactions() {
    const currentUser = useCurrentUser();

    const { loading, error, data } = useQuery(GET_USER_TRANSACTIONS, {
        variables: { userUid: currentUser.uid },
    });

    if (loading) return <GlobalInitialPageLoader />;

    if (error) return <ErrorBox message={error.message} />;

    const transactions = data?.getUserTransactions?.transactions;

    return (
        <Container size="xl" py="xl">
            <Title order={4} mb="xl">
                My Transactions
            </Title>

            <Tabs defaultValue="bought" color="indigo">
                <Tabs.List>
                    <Tabs.Tab value="bought">
                        <Flex align="end">
                            <Text fw={600} size="sm">
                                Bought
                            </Text>
                            {
                                <Badge
                                    size="sm"
                                    circle
                                    ml={8}
                                    color="indigo"
                                    variant="filled"
                                >
                                    {transactions.bought.length}
                                </Badge>
                            }
                        </Flex>
                    </Tabs.Tab>
                    <Tabs.Tab value="sold">
                        <Flex align="end">
                            <Text fw={600} size="sm">
                                Sold
                            </Text>
                            {
                                <Badge
                                    size="sm"
                                    circle
                                    ml={8}
                                    color="indigo"
                                    variant="filled"
                                >
                                    {transactions.sold.length}
                                </Badge>
                            }
                        </Flex>
                    </Tabs.Tab>
                    <Tabs.Tab value="borrowed">
                        <Flex align="end">
                            <Text fw={600} size="sm">
                                Borrowed
                            </Text>
                            {
                                <Badge
                                    size="sm"
                                    circle
                                    ml={8}
                                    color="indigo"
                                    variant="filled"
                                >
                                    {transactions.borrowed.length}
                                </Badge>
                            }
                        </Flex>
                    </Tabs.Tab>
                    <Tabs.Tab value="lent">
                        <Flex align="center">
                            <Text fw={600} size="sm">
                                Lent
                            </Text>
                            {
                                <Badge
                                    size="sm"
                                    circle
                                    ml={8}
                                    color="indigo"
                                    variant="filled"
                                >
                                    {transactions.lent.length}
                                </Badge>
                            }
                        </Flex>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="bought" pt="xl">
                    <TransactionList
                        transactions={transactions?.bought}
                        viewType="bought"
                        emptyMessage="You haven't purchased any products yet."
                    />
                </Tabs.Panel>

                <Tabs.Panel value="sold" pt="xl">
                    <TransactionList
                        transactions={transactions?.sold}
                        viewType="sold"
                        emptyMessage="You haven't sold any products yet."
                    />
                </Tabs.Panel>

                <Tabs.Panel value="borrowed" pt="xl">
                    <TransactionList
                        transactions={transactions?.borrowed}
                        viewType="borrowed"
                        emptyMessage="You haven't borrowed any products yet."
                    />
                </Tabs.Panel>

                <Tabs.Panel value="lent" pt="xl">
                    <TransactionList
                        transactions={transactions?.lent}
                        viewType="lent"
                        emptyMessage="You haven't lent any products yet."
                    />
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
}
