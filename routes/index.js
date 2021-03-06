var express = require('express');
var router = express.Router();

const multer = require('../middleware/multer.config');
const auth = require('../middleware/auth.config');


// Route for simple price estimate
const priceEstim = require("../controllers/price_estimate.controller.js");

/* Create simple purchase request . */
router.post('/price_estim', priceEstim.create);

// Modify simple purchase request
router.put('/price_estim/:id', priceEstim.update);

// Delete simple purchase request
router.delete('/price_estim/:id', auth, priceEstim.delete);
router.delete('/price_estim', auth, priceEstim.deleteAll)

// Get simple purchase request
router.get('/price_estim', auth, priceEstim.findAll);
router.get('/price_estim/:id', priceEstim.findOne);


// Route for accurate price estimate
const accurateEstim = require("../controllers/accurate_estimate.controller.js");

/* Create simple purchase request . */
router.post('/accurate_estim', multer, accurateEstim.create);

// Modify simple purchase request
router.put('/accurate_estim/:id', accurateEstim.update);

// Delete simple purchase request
router.delete('/accurate_estim/:id', auth, accurateEstim.delete);
router.delete('/price_estim', auth, accurateEstim.deleteAll)

// Get simple purchase request
router.get('/accurate_estim', auth, accurateEstim.findAll);
router.get('/accurate_estim/:id', accurateEstim.findOne);

// Route for user
const user = require("../controllers/user.controller.js");

// Create user
router.post('/user/signup', user.signup);

// Login
router.post('/user/login', user.login);

// Logout
router.post('/user/logout', user.logout);

// Get info for one user
router.get('/user/:id', auth, user.findOne);
router.get('/user', auth, user.findAll);

// Modify user
router.put('/user', auth, user.update);

// Delete user
router.delete('/user', auth, user.deleteAll);
router.delete('/user/:id', auth, user.delete);

module.exports = router;

// Route for sub-category
const subCategory = require("../controllers/sub-category.controller.js");

// Create fonction
router.post('/sub-category', [auth, multer], subCategory.create)

// Modify fonction
router.put('/sub-category/:id', auth, subCategory.update);

// Get fonction
router.get('/sub-category/:id', subCategory.findOne);
router.get('/sub-category', subCategory.findAll);

// Delete fonction
router.delete('/sub-category/:id', auth, subCategory.delete);
router.delete('/sub-category', auth, subCategory.deleteAll);

// Route for category
const category = require("../controllers/category.controller.js");

// Create category
router.post('/category', [auth, multer], category.create)

// Modify category
router.put('/category/:id', category.update);

// Get category
router.get('/category/:id', category.findOne);
router.get('/category', category.findAll);
router.get('/category/root_category/:root_cat', category.findWithRootCategory);

// Delete category
router.delete('/category/:id', auth, category.delete);
router.delete('/category', auth, category.deleteAll);

// Route for category
const calcul = require("../controllers/calcul.controller.js");

// Calcul function
router.post('/calcul', calcul.run);

// Get fonction
router.get('/calcul/:id', calcul.findOne);
router.get('/calcul', auth, calcul.findAll);

// Delete fonction
router.delete('/calcul/:id', auth, calcul.delete);
router.delete('/calcul', auth, calcul.deleteAll);

// Route for arguments
const val_func = require("../controllers/valeur_function.controller.js");

// Create value for fonction
router.post('/val_func', auth, val_func.create);

// Modify value for fonction
router.put('/val_func/:id', auth, val_func.update);

// Get value for fonction
router.get('/val_func/:id', val_func.findOne);
router.get('/val_func', val_func.findAll);
router.get('/val_func/category/:cat_id', val_func.findWithCatId);

// Delete value for fonction
router.delete('/val_func/category/:cat_id', auth, val_func.deleteWithCatId)
router.delete('/val_func/:id', auth, val_func.delete);
router.delete('/val_func', auth, val_func.deleteAll);

// Route for arguments value
const input_func = require("../controllers/input_function.controller.js");

// Create arguments value
router.post('/input_func', input_func.create);

// Modify arguments value
router.put('/input_func/:id', input_func.update);

// Get arguments value
router.get('/input_func/:id', input_func.findOne);
router.get('/input_func', input_func.findAll);
router.get('/input_func/price_estim/:price_estim_id', auth, input_func.findWithPriceEstimId)

// Delete arguments value
router.delete('/input_func/:id', auth, input_func.delete);
router.delete('/input_func/price_estim/:price_estim_id', auth, input_func.deleteWithPriceEstimId)
router.delete('/input_func', auth, input_func.deleteAll);

// Route for array value
const array_val_func = require("../controllers/array_value_function.controller");

// Create array value
router.post('/array_val', auth, array_val_func.create);

// Modify array value
router.put('/array_val/:id', auth, array_val_func.update);

// Get array value
router.get('/array_val/:id', array_val_func.findOne);
router.get('/array_val', array_val_func.findAll);
router.get('/array_val/val_func/:val_func_id', array_val_func.findWithValFuncId);


// Delete array value
router.delete('/array_val/:id', auth, array_val_func.delete);
router.delete('/array_val', auth, array_val_func.deleteAll);
router.delete('/array_val/val_func/:val_func_id', auth, array_val_func.deleteWithValFuncId);