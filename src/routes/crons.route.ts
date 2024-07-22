import express, { NextFunction, Request, Response } from "express";

import {
    deleteFromDatabase,
    handleParentToChildren,
    syncDatabaseAndSalesforce,
  } from '../services/salesforce.service'
const router = express.Router();

router.route('/sync').get( async (  req: Request,
    res: Response,
    next: NextFunction) => {  
  try {     
    //await syncDatabaseAndSalesforce()
    console.log("Ran sync no error.")
    res.status(201).json({
        status: 'success',
        data: {
          sync: 'Ran sync success',
        },
      })
  } catch (error) {
    console.error('Error during scheduled synchronization:', error)
    next(error)
  }})

  export default router;