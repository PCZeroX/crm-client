import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache();

const link = new HttpLink({
	uri: "http://localhost:4000",
	credentials: "include",
});

const client = new ApolloClient({
	connectToDevTools: true,
	cache,
	link,
});

export default client;
