import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { DocumentNode } from 'apollo-link';
export declare type RequestHandler<TData = any, TVariables = any> = (variables: TVariables) => Promise<RequestHandlerResponse<TData>>;
export declare type RequestHandlerResponse<T> = {
    data: T;
    errors?: any[];
};
export declare type MockApolloClient = ApolloClient<NormalizedCacheObject> & {
    setRequestHandler: (query: DocumentNode, handler: RequestHandler) => void;
};
export declare type MockApolloClientOptions = Partial<Omit<ApolloClientOptions<NormalizedCacheObject>, 'link'>> | undefined;
export declare const createMockClient: (options?: MockApolloClientOptions) => MockApolloClient;
