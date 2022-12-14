import { Author } from "../models/author";
import { getGitHubToken, getGithubUser, createJWT } from "../utils/functions";
import { Request, Response } from "express";



export let loginGithub = async (req: Request, res: Response) => {
    try {
        let code: any = req.query.code;
        //get git access token
        let github_token = await getGitHubToken(code);

        //github user details
        let { name, email } = await getGithubUser(github_token);


        //check if author already exists in the database
        let old_author = await Author.findOne({ email: email });


        //if they don't exist
        //we create one
        if (!old_author) {
            Author.create({ name: name, email: email })
                .then(val => {
                    let id = val.toObject()._id.toString();
                    //create a token
                    let token = createJWT({
                        email: email,
                        admin: false,
                        author_id: id
                    });
                    return res.json({ token });
                })
                .catch(err => {
                    return res.json({ "message": err });
                })
        }
        else {
            //if the author is already in the database
            let author_id = old_author!.toObject()._id.toString();
            let token = createJWT({
                email: email,
                admin: false,
                author_id
            });

            return res.json({ token });
        }



    } catch (error) {
        return res.json(error);
    }


}