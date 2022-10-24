import { db } from "../database.js";
import { v4 as uuid } from "uuid";

export const createCart = (req, res) => {
    const cartInfo = req.body;

    cartInfo.cart_id = uuid();


    let query = `INSERT INTO carts (user_id, product_id, product_quantity, cart_id) VALUES (?) ;`;

    db.query(query, [Object.values(cartInfo)], (error, data) => {
        if (error) return res.status(500).json(error);
    });

    // query = `UPDATE products SET print_length = products.print_length - ? WHERE id = ? ;`;

    // db.query(query, [cartInfo.product_quantity, cartInfo.product_id],
    //      (error, data) => {
    //     if (error) return res.status(500).json(error);
    //     return res.status(200).json("Cart has been Created AND Product quantity has been Updated.");
    // });
};

export const updateCart = (req, res) => {

    let query = `UPDATE carts SET product_quantity = ? WHERE id = ? ;`;

    db.query(query, [req.body.quantity, req.body.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Cart has been Updated.");
    })

};

export const deleteCart = (req, res) => {

    let query = `DELETE FROM carts WHERE id = ?`;

    db.query(query, [req.body.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Cart has been Deleted.");
    })
}