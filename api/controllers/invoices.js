import express from 'express';
import invoices from '../data/invoices.js'
import invoiceItems from '../data/invoiceItems.js';

const router = express.Router();

// Obtener todas las facturas
router.get('/', async (req, res) => {
    try {
        const invoiceList = await invoices.getInvoices();
        res.json(invoiceList);
    } catch (error) {
        console.error('Error al obtener facturas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// obtener factura por id
router.get('/:invoiceId', async (req, res)=>{
    try {
        const {invoiceId} = req.params;
        const invoice = await invoices.getInvoiceById(invoiceId);
        const items = await invoiceItems.getInvoiceItemsByInvoiceId(invoiceId);
        res.status(200).json({invoice:invoice[0], items})
    } catch (error) {
        console.log('❌',error);
        res.status(500).json({error:"Internal server error"})
    }
})

// Crear una nueva factura
router.post('/', async (req, res) => {
    try {
        const newInvoice = req.body;
        const result = await invoices.addInvoice(newInvoice);

        // Obtener el ID de la factura insertada
        const invoiceId = result[0].factura_id;

        // Insertar los items de la factura
        for (const item of newInvoice.items) {
            item.factura_id = invoiceId;
            await invoiceItems.addInvoiceItem(item);
        }

        res.status(201).json({ message: 'Factura creada exitosamente', invoiceId: invoiceId });
    } catch (error) {
        console.error('Error al crear factura:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const invoiceId = parseInt(req.params.id);

        // Eliminar primero los items asociados a la factura
        await invoiceItems.deleteInvoiceItemsByInvoiceId(invoiceId);

        // Eliminar la factura
        await invoices.deleteInvoice(invoiceId);

        res.json({ message: 'Factura e items eliminados exitosamente' });
    } catch (error) {
        console.error('Error al eliminar factura:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;