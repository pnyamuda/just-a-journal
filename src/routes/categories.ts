import express, { Request, Response } from "express";
import {
    getAllCategories, getCategoryById, addCategory,
    deleteCategoryById, updateCategoryById
} from "../controllers/index";
let router = express.Router();
import * as middleware from '../utils/middleware';

import * as dotenv from "dotenv";
dotenv.config();



router.route("/categories")
    .get(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Get all the categories'
        // #swagger.security = [{"apiKeyAuth": []}]
        getAllCategories(req, res);
    })
    .post(middleware.ensureAdmin, (req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Add a category'
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.description ='<p> Only admins have the authority to add a category.</p>'
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/addCategory' }
             } 
      
      
      */
        addCategory(req, res);

    })




router.route("/categories/:categoryId")
    .get(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.summary = 'Get a category by id'
        getCategoryById(req, res);
    })

    .put(middleware.ensureAdmin, (req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Update an existing category'
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to update existing categories.</p>'
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updateCategory' }
             } 
      
      
      */
        updateCategoryById(req, res);
    })
    .delete(middleware.ensureAdmin, (req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Delete a category'
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to delete a category.</p>'
        deleteCategoryById(req, res);
    })












export { router as categoryRoutes }