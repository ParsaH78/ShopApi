import { db } from "../database.js";
import { v4 as uuid } from "uuid";

export const createOrder = (req, res) => {
    const orderInfo = req.body;

    if (!orderInfo.order_id) {
        orderInfo.order_id = uuid();
    }

    let query = `SELECT * FROM carts WHERE cart_id = ? ;`;

    db.query(query, [orderInfo.cart_id], (error, data) => {
        if (error) return res.status(500).json(error);
        if (orderInfo.product_quantity > data[0].product_quantity) return res.status(500).json({message: "Quantity !"});
    });

    query = `INSERT INTO orders (user_id, product_id, product_quantity,
         price, address, status, order_id) VALUES (?) ;`;

    db.query(query, [Object.values(orderInfo)], (error, data) => {
        if (error) return res.status(500).json(error);
    });

    query = `UPDATE products SET print_length = products.print_length - ? WHERE id = ? ;`;

    db.query(query, [orderInfo.product_quantity, orderInfo.product_id],
         (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Order has been Created AND Product quantity has been Updated.");
    });
};

export const updateOrder = (req, res) => {

    let query = `UPDATE orders SET product_quantity = ? WHERE id = ? ;`;

    db.query(query, [req.body.quantity, req.body.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Order has been Updated.");
    })

};

export const deleteOrder = (req, res) => {

    let query = `DELETE FROM orders WHERE id = ?`;

    db.query(query, [req.body.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Order has been Deleted.");
    })
};

export const getUserOrder = (req, res) => {

    let query = `SELECT * FROM orders WHERE user_id = ?`;

    db.query(query, [req.params.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    })
};

export const getSingleOrder = (req, res) => {

    let query = `SELECT * FROM orders WHERE Order_id = ?`;

    db.query(query, [req.params.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    })
};

export const getAllOrder = (req, res) => {

    let query = `SELECT * FROM orders`;

    db.query(query, (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    })
};