import { db } from "../database.js";

export const cerateProduct = (req, res) => {
    const productInfo = req.body;

    const query = `INSERT INTO products (title, description, categories, image,
         price, print_length, language, publisher, publication_date,
          dimentions, binding) VALUES (?);`;

    db.query(query, [Object.values(productInfo)], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Product has been created.");
    });
};

