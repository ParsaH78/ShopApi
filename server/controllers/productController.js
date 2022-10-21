import { db } from "../database.js";

export const createProduct = (req, res) => {
    const productInfo = req.body;

    const query = `INSERT INTO products (title, description, categories, image,
         price, print_length, language, publisher, publication_date,
          dimentions, binding) VALUES (?);`;

    db.query(query, [Object.values(productInfo)], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Product has been Created.");
    });
};

export const updatedProduct = (req, res) => {
    const {id, ...updatedInfo} = req.body;

    const keys = Object.keys(updatedInfo);
    const values = Object.values(updatedInfo);

    let query = `UPDATE products SET `;

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

    query = query.concat(` WHERE id = (?) ;`);

    db.query(query, [req.body.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Product has been Updated.");
    });
};

