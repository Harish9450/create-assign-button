//
// Copyright (C) Microsoft Corporation.  All rights reserved.
//

/**
 * Contains information about a failed Web request.
 */
export class WebRequestError extends Error {

    /**
     * Initializes a new instance of the WebRequestError class with the provided error response.
     * @param response The error response received from the server.
     */
    public constructor(public readonly response: Response) {
        super(`Request failed with error ${response.statusText}`);

        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, WebRequestError.prototype);
    }
}
