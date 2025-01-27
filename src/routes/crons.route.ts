import express, { NextFunction, Request, Response } from "express";

import {
    deleteFromDatabase,
    handleParentToChildren,
    syncDatabaseAndSalesforce,
  } from '../services/salesforce.service'

const router = express.Router();

/**
 * FixMe: ...run a cron weekly? to clean up any possible parent || students || relationships unreferenced or synced data ??
 */
router.route('/sync').get( async (  req: Request,
    res: Response,
    next: NextFunction) => {  
  try {
   // await syncDatabaseAndSalesforce()
    console.log("Syncronized")
    res.status(201).json({
        status: 'success',
        message:  'syncDatabaseAndSalesforce successfully executed',
      })

  } catch (error) {
    console.error('syncDatabaseAndSalesforce error during scheduled synchronization:', error)
    next(error)
  }})

  router.route("/relationships").get(
    async ( req: Request, res: Response, next: NextFunction) => {
      try{
        await handleParentToChildren();
        res.status(201).json({
          "status": "success",
          "message": "handleParentToChildren successfully executed",
        })
      }catch(error){
        console.error("handleParentToChildren error during scheduled synchronization:", error)
        next(error)
      }
    }
  )

  router.route("/delete-orphans").get(
    async ( req: Request, res: Response, next: NextFunction ) => {
      try{
        await deleteFromDatabase();
        res.status(201).json({
          "status":"success",
          "message": "deleteFromDatabase successfully executed",
        })
      }catch(error){
        console.error("deleteFromDatabase error during scheduled synchronizatoin:", error);
        next(error)
      }
  })


  export default router;