import express from 'express';
import products from './../data/products.js'

const router = express.Router({ mergeParams: true });

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productList = await products.getProducts();
        res.json(productList);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await products.getProductById(productId);

        if (product && product.length > 0) {
            res.json(product[0]); // Devuelve el primer producto encontrado
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body; // Asegúrate de que el cuerpo de la solicitud tenga los datos del producto
        await products.addProduct(newProduct);
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = req.body;
        updatedProduct.producto_id = parseInt(req.params.id); // Asegura que el ID sea correcto
        await products.updateProduct(updatedProduct);
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        await products.deleteProduct(productId);
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;