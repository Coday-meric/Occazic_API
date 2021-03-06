const db = require("../db/models");
const Array_val_func = db.Array_val_func;

// Create request for estimate price
exports.create = (req, res) => {
// Validate request
    if (!req.body.name) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a request
    const arrayValFunc = new Array_val_func({
        name: req.body.name,
        value: req.body.value,
        val_func_id: req.body.val_func_id
    });
    console.log(arrayValFunc);
    console.log(arrayValFunc.id);

    // Save request in mongodb
    arrayValFunc
        .save(arrayValFunc)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the request."
            });
        });
};

// Modify request for estimate price
exports.update = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Recover request with ID
    const id = req.params.id;
    // Modify a request
    Array_val_func.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update request with id=${id}. Maybe request was not found!`
                });
            } else res.send({message: "Request was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating request with id=" + id
            });
        });
};

// Delete request for estimate price
exports.delete = (req, res) => {
    // Recover request with id
    const id = req.params.id;
    // Delete request
    Array_val_func.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete request with id=${id}. Maybe request was not found!`
                });
            } else {
                res.send({
                    message: "Request was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete request with id=" + id
            });
        });
};

// Delete All request
exports.deleteAll = (req, res) => {
    Array_val_func.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} request were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all request."
            });
        });
};

// Delete request with Val Func ID
exports.deleteWithValFuncId = (req, res) => {
    const val_func_id = req.params.val_func_id
    Array_val_func.deleteMany({val_func_id: val_func_id})
        .then(data => {
            res.send({
                message: `${data.deletedCount} array value were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all array value."
            });
        });
};

// Retrieve a single request
exports.findOne = (req, res) => {
    // Recover request with id
    const id = req.params.id;

    Array_val_func
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found request with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving request with id=" + id});
        });
};

// Retrieve all request with condition
exports.findAll = (req, res) => {
    // Recover request with name
    const name = req.query.value;
    var condition = name ? {name: {$regex: new RegExp(name), $options: "i"}} : {};

    Array_val_func
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving request."
            });
        });
};

// Retrieve Array value with Val Func id
exports.findWithValFuncId = (req, res) => {
    // Recover request with id
    const val_func_id = req.params.val_func_id;
    console.log(val_func_id);

    Array_val_func.find({ val_func_id: val_func_id })
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found request with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving request with id=" + id});
        });
};
