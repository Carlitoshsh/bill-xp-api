import runCommand from "./entry.js";

const addInvoice = async (invoice) => {
    const insert = `
        INSERT INTO facturas (cliente_id, fecha_emision, total) VALUES (
            ${invoice.cliente_id},
            '${invoice.fecha_emision}',
            ${invoice.total}
        ) returning factura_id;
    `;
    return await runCommand(insert); // Retorna el resultado de la inserción
};

const getInvoices = async () => {
    const select = `SELECT * FROM facturas;`;
    return await runCommand(select);
};

const getInvoiceById = async (invoiceId) =>{
    const selectInvoiceById = `SELECT * FROM facturas WHERE factura_id = ${invoiceId}`;
    return await runCommand(selectInvoiceById)
}

const deleteInvoice = async (invoiceId) => {
    const del = `
        DELETE FROM facturas WHERE factura_id = ${invoiceId};
    `;
    await runCommand(del);
};

const invoices = {
    addInvoice,
    getInvoices,
    getInvoiceById,
    deleteInvoice,
};

export default invoices;