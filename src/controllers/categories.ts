import { Category } from "../models";
import { Request, Response } from "express";
import { validateName, validateNameUpdate } from "../utils/functions";



//find category by id
export let getCategoryById = async (req: Request, res: Response) => {
    try {
        let category = await Category.findById(req.params.categoryId);
        return res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }
}

//add a category
export let addCategory = async (req: Request, res: Response) => {
    //validate post data first
    let valid_details = validateName(req.body);

    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }

    let { name } = req.body;

    //mo errors
    //add the category
    Category.create({ name })
        .then(category => {

            return res.status(201).json({ message: 'The category was successfully created.', _id: category._id })
        })
        .catch(err => {
            res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
        })

}



//delete a category
export let deleteCategoryById = (req: Request, res: Response) => {


    Category.findByIdAndDelete(req.params.categoryId)
        .then(val => {
            return res.json({ message: 'The delete operation was successful. ' })
        })
        .catch(err => {
            return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err })
        })

}


//update category
export let updateCategoryById = async (req: Request, res: Response) => {
    try {
        //validate the post data
        let valid_details = validateNameUpdate(req.body);

        //if there is an error
        if (valid_details.error) {
            return res.status(400).json({ message: valid_details.message });
        }
        let { name } = req.body;


        //if there are no errors
        //update the category
        Category.findByIdAndUpdate(req.params.categoryId, { name })
            .then(val => {
                return res.json({ message: 'The update operation was successful.' })



            })
    } catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error })
    }

}


//get all categories
export let getAllCategories = async (req: Request, res: Response) => {

    try {
        let all_categories = await Category.find({});
        return res.json(all_categories);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }

}

