import express, { Request, Response, NextFunction } from 'express';

interface MockResponse {
    
  }
  
const responses: MockResponse = {};
  
export function setupRoutes (app : express.Express) {
    app.post('/_set-response', (req: Request, res: Response) => {

    });

    app.post('/_reset', (req: Request, res: Response) => {

    });
      
    app.use((req: Request, res: Response, next: NextFunction) => {
        next();
    });
}
