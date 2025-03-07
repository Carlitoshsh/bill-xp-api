import product from './products.js'
import invoices from './invoices.js'

export default function setupControllers(app) {
    app.get('/', (req, res) => {
        res.send({
            about: 'Simple API for save invoices'
        });
    })
    app.get('/health', (req, res) => {
        res.send({
            connected: true
        });
    })
    app.use('/products', product)
    app.use('/invoices', invoices)
}