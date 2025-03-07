import runCommand from "./entry.js";

const addProduct = async (product) => {
    const insert = `
        INSERT INTO productos (nombre, precio) VALUES (
            '${product.nombre}',
            ${product.precio}
        );
    `;
    await runCommand(insert);
};

const getProducts = async () => {
    const select = `
        SELECT * FROM productos;
    `;
    return await runCommand(select);
};

const deleteProduct = async (productId) => {
    const del = `
        DELETE FROM productos WHERE producto_id = ${productId};
    `;
    await runCommand(del);
};

const updateProduct = async (product) => {
    const update = `
        UPDATE productos SET
            nombre = '${product.nombre}',
            precio = ${product.precio}
        WHERE producto_id = ${product.producto_id};
    `;
    await runCommand(update);
};

const getProductById = async (productId) =>{
    const selectById = `select * from productos where producto_id = ${productId};`
    return await runCommand(selectById);
}

const products = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductById
};

export default products;