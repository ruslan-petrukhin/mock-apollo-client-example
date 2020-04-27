import { ApolloLink, DocumentNode, Observable, Operation, FetchResult } from 'apollo-link';
import { RequestHandler } from './mockClient';
export declare class MockLink extends ApolloLink {
    private requestHandlers;
    setRequestHandler(requestQuery: DocumentNode, handler: RequestHandler): void;
    request(operation: Operation): Observable<FetchResult<{
        [key: string]: any;
    }, Record<string, any>, Record<string, any>>>;
}
