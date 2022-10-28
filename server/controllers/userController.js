import { db } from "../database.js";

export const updateUser = (req, res) => {
    const {user_id, ...userInfo} = req.body;

    const keys = Object.keys(userInfo);
    const values = Object.values(userInfo);

    let query = "UPDATE users SET";

    for (let i = 0; i < keys.length; i++) {
        for (let j = i; j < values.length; j++) {
            if (i == keys.length - 1) {
                query = query.concat(` \`${keys[i]}\` = '${values[j]}'`);
            } else {
                query = query.concat(` \`${keys[i]}\` = '${values[j]}' ,`);
            }
            break;
        }
    }

    query = query.concat(` WHERE id = ${req.user.id} ;`);

    db.query(query,
         (error, data) => {
            if (error) return res.status(404).json(error);
            res.status(201).json({message: "User has been Updated"});
     });
};

export const getUser = (req, res) => {
    
    const query = `SELECT first_name, last_name, email, username, image, 
        address, city, postal_code, phone_number from users WHERE id = ? ;`

    db.query(query, [req.params.id], (error, data) => {
        if (error) return res.status(404).json(error);
        return res.status(200).json(data[0]);
    });

}