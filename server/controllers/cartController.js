import { db } from "../database.js";
import { v4 as uuid } from "uuid";

export const createCart = (req, res) => {
    const cartInfo = req.body;

    if (!cartInfo.cart_id) {
        cartInfo.cart_id = uuid();
    }

    let query = `INSERT INTO carts (user_id, product_id, product_quantity, cart_id) VALUES (?) ;`;

    db.query(query, [Object.values(cartInfo)], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Cart has been Created");
    });

};

export const updateCart = (req, res) => {

    let query = `UPDATE carts SET product_quantity = ? WHERE id = ? ;`;

    db.query(query, [req.body.quantity, req.body.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Cart has been Updated.");
    })

};

export const deleteCart = (req, res) => {

    let query = `DELETE FROM carts WHERE cart_id = ?`;

    db.query(query, [req.body.cart_id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Cart has been Deleted.");
    })
};

export const getUserCart = (req, res) => {

    let query = `SELECT * FROM carts WHERE user_id = ?`;

    db.query(query, [req.params.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    })
};

export const getSingleCart = (req, res) => {

    let query = `SELECT * FROM carts WHERE cart_id = ?`;

    db.query(query, [req.params.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    })
};

export const getAllCart = (req, res) => {

    let query = `SELECT * FROM carts`;

    db.query(query, (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    })
};