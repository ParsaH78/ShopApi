import { db } from "../database.js";

export const updateUser = (req, res) => {
    const {id, ...userInfo} = req.body;

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

    query = query.concat(` WHERE id = ${req.body.id} ;`);

    db.query(query,
         (error, data) => {
            if (error) return res.status(404).json(error);
            res.status(201).json({message: "بروزرسانی کاربر با موفقیت انجام شد"});
     });
};

