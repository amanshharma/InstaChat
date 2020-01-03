import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

//For GQL Subscriptions
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";

import httpUri from "./httpUri";
const wsUri = httpUri.replace(/^https?/, "ws");

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    // Automatic reconnect in case of connection error
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: httpUri
});

export interface Definition {
  kind: string;
  operation?: string;
}

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation }: Definition = getMainDefinition(query);
    // If this is a subscription query, use wsLink, otherwise use httpLink
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
const link = ApolloLink.from([terminatingLink]);

const inMemoryCache = new InMemoryCache();
export default new ApolloClient({
  link,
  cache: inMemoryCache
});
