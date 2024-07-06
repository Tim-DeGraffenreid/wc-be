import express from "express";
import {
    deleteFromDatabase,
    handleParentToChildren,
    syncDatabaseAndSalesforce,
  } from '../services/salesforce.service'
const router = express.Router();

router.route('/sync').get( async () => {  
    try {
        console.log("Ran sync no error.")
    //await syncDatabaseAndSalesforce()
  } catch (error) {
    console.error('Error during scheduled synchronization:', error)
  }})

  export default router;