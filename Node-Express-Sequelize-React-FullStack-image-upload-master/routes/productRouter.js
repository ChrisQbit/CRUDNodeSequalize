// import controllers review, products
const productController = require('../controllers/productController.js')


// router
const router = require('express').Router()


// use routers
router.post('/addProduct', productController.upload , productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)




// Products router
router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router