import runCommand from "./entry.js";

const addInvoiceItem = async (item) => {
    const insert = `
        INSERT INTO items_factura (factura_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (
            ${item.factura_id},
            ${item.producto_id},
            ${item.cantidad},
            ${item.precio_unitario},
            ${item.subtotal}
        );
    `;
    return await runCommand(insert);
};

const getInvoiceItemsByInvoiceId = async (invoiceId) => {
    const select = `
        SELECT * FROM items_factura WHERE factura_id = ${invoiceId};
    `;
    return await runCommand(select);
};

const deleteInvoiceItemsByInvoiceId = async (invoiceId) => {
    const del = `
        DELETE FROM items_factura WHERE factura_id = ${invoiceId};
    `;
    await runCommand(del);
};

const invoiceItems = {
    addInvoiceItem,
    getInvoiceItemsByInvoiceId,
    deleteInvoiceItemsByInvoiceId
};

export default invoiceItems;