const db = require('../db')

class DiscController {
    getAllDiscs(req, res) {
        try {
            db.query('SELECT ' +
                'idДиски as idDisc,' +
                'idsize as discSizeId,' +
                'idvendor as vendorId,' +
                'Страна as vendorCountry,' +
                'Наименование as vendorName,' +
                'idРазмер as discSizeId,' +
                'Диаметр as discDiametr,' +
                'Ширина as discWidth ' +
                'FROM диски ' +
                'JOIN производитель_дисков ON производитель_дисков.id = диски.idvendor ' +
                'JOIN размер_дисков ON размер_дисков.idРазмер = диски.idsize', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting discs'})
        }
    }

    getDiscSizes(req, res) {
        try {
            db.query('SELECT idРазмер as idDiscSize, Диаметр as discDiametr, Ширина as discWidth FROM размер_дисков', function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting discs'})
        }
    }

    createDisc(req, res) {
        const {vendorId, sizeId} = req.body
        try {
            db.query(`INSERT INTO диски (idsize, idvendor) VALUES (${vendorId},${sizeId})`, function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.json(err)
                }
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error creating discs'})
        }
    }

    deleteDisc(req, res) {
        const id = req.params.id
        try {
            db.query(`DELETE from диски where idДиски = ${id}`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    res.json(results)
                })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error deleting product'})
        }
    }

    updateDisc(req, res) {
        try{
            const {id, vendorId, sizeId} = req.body
            console.log(req.body)
            db.query(`UPDATE диски set idsize = ${sizeId}, idvendor = ${vendorId} where idДиски = ${id}`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    res.json(results)
                })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error editing disc'})
        }
    }


}

module.exports = new DiscController()