const db = require("../db/models");
const Valeur_function = db.Val_func;
const Category = db.Category;

// Create category with function
exports.create = async (req, res) => {
// Validate request
    if (!req.body.catID) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Front pass category id
    const category = await Category.findById(req.body.catID)
    // Create a request
    const addVal_func = new Valeur_function({
        name: req.body.name,
        array: req.body.array,
        text: req.body.text,
        category: category._id
    });
    console.log(addVal_func);
    console.log(addVal_func.id);

    // Save request in mongodb
    addVal_func
        .save(addVal_func)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the category."
            });
        });
};

// Modify category or function
exports.update = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Recover request with ID
    const id = req.params.id;
    // Modify a request
    Valeur_function.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Val Func with id=${id}. Maybe Val Func was not found!`
                });
            } else res.send({message: "Val Func was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating request with id=" + id
            });
        });
};

// Delete category
exports.delete = (req, res) => {
    // Recover request with id
    const id = req.params.id;
    // Delete request
    Valeur_function.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete category with id=${id}. Maybe category was not found!`
                });
            } else {
                res.send({
                    message: "Category was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete category with id=" + id
            });
        });
};

// Delete Value Function with price_estimate_id
exports.deleteWithCatId = (req, res) => {
    // Recover all Value Function with category id
    const cat_id = req.params.cat_id;
    console.log(cat_id)
    // Delete Value Function
    Valeur_function.deleteMany({ category: cat_id})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete value function with id=${cat_id}. Maybe value function was not found!`
                });
            } else {
                res.send({
                    message: `${data.deletedCount} value function were deleted successfully!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete value function with id=" + id
            });
        });
};

// Delete All category
exports.deleteAll = (req, res) => {
    Valeur_function.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} category were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all category."
            });
        });
};

// Retrieve a single category
exports.findOne = (req, res) => {
    // Recover request with id
    const id = req.params.id;
    console.log(id);

    Valeur_function.findById(id)
        .populate({
            path:"array_id",
            model:"Array_val_func"
        })
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found category with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving category with id=" + id});
        });
};

// Retrieve all category with condition
exports.findAll = (req, res) => {
    // Recover request with name
    const name = req.query.name;
    var condition = name ? {name: {$regex: new RegExp(name), $options: "i"}} : {};

    Valeur_function.find(condition)
        .populate({
            path:"array_id",
            model:"Array_val_func"
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving category."
            });
        });
};

// Retrieve Val Func with category id
exports.findWithCatId = (req, res) => {
    // Recover request with id
    const cat_id = req.params.cat_id;
    console.log(cat_id);

    Valeur_function.find({ category: cat_id })
        .populate({
            path:"array_id",
            model:"Array_val_func"
        })
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found category with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving category with id=" + id});
        });
};