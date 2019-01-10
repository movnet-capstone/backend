/**
 * Represents errors generated by movnet
 */
export class MovnetError extends Error {

    /**
     * HTTP status code
     */
    private status: number;

    /**
     * Additional details for error
     */
    private details: any;

    /**
     * Creates a new MovnetError
     * @param status HTTP status code
     * @param message Error message
     * @param details Additional details about the error
     */
    constructor(status: number, message: string, details?: any) {
        super(message);
        Object.setPrototypeOf(this, MovnetError.prototype);

        this.status = status;
        this.details = details;
    }

    /**
     * Returns the HTTP status code
     */
    public getStatus(): number {
        return this.status;
    }

    /**
     * Returns the error message
     */
    public getMessage(): string {
        return this.message;
    }

    /**
     * Returns the details of the error
     */
    public getDetails(): any {
        return this.details;
    }
}
