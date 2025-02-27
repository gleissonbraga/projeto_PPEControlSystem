declare namespace Express {
    export interface Request {
        payload?: {
            id: z.number,
            name: z.string,
            company: z.number,
            status_admin: z.number
        };
        userId?: number;
    }
}
