import { Request, Response } from "express";
import { Author } from "../models";
import { validateLoginDetails, createJWT } from "../utils/functions";
import * as bcrypt from "bcrypt";


export let loginAuthor = async (req: Request, res: Response) => {
    let email: string = req.body.email || req.query.email;
    let password: string = req.body.password || req.query.password;


    //validate login details
    let valid_details = validateLoginDetails(email, password);

    //if the details are not valid
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message })
    }

    //check if user is in the database
    let old_author = await Author.findOne({ email });



    //if user doesn't exist
    if (!old_author) {
        return res.status(400).json({ message: "A user with that email does not exist." })
    }

    //compare passwords
    let is_password_correct = await bcrypt.compare(password, old_author.password!);

    if (!is_password_correct) {
        return res.status(400).json({ message: "Incorrect password" })
    }


    //if there are no errors
    //create and access token
    let author_id = old_author.toObject()._id.toString();
    let token = createJWT({ email: email, admin: old_author.admin, author_id });

    return res.json({ token });


}