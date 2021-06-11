const db = require('../db')

class TireController {
    getAllTires(req, res) {
        try {
            db.query('SELECT ' +
                'idТовар as id, ' +
                'стоимость as price, ' +
                'описание as description, ' +
                'Имя as tireMakerName, ' +
                'производитель_шин.Страна as tireCountry, ' +
                'производитель_дисков.Страна as discCountry, ' +
                'Наименование as discMakerName FROM товар ' +
                'JOIN шины ON шины.idшины = товар.id_шины ' +
                'JOIN `производитель_шин` ON шины.id_производителя = производитель_шин.id_vendor_psh ' +
                'JOIN диски ON диски.idДиски = товар.id_диски ' +
                'JOIN `производитель_дисков` ON диски.idvendor = производитель_дисков.id ' +
                'where id_диски AND id_шины', function (err, results, fields) {
                if (err) return res.json(err)
                res.json(results)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting tires'})
        }
    }

    getTire(req, res) {
        try {
            db.query(`
                SELECT 
                idТовар as id,
                стоимость as price,
                описание as description,
                Имя as tireMakerName,
                производитель_шин.Страна as tireCountry,
                производитель_дисков.Страна as discCountry,
                производитель_дисков.Наименование as discMakerName,
                параметры_шин.диаметр as tireDiametr,
                параметры_шин.ширина as tireWidth,
                высота as tireHeight,
                Сезон as tireSeason,
                тип_резины.Наименование as tireTypeName,
                размер_дисков.Диаметр as discDiametr,
                размер_дисков.Ширина as discWidth
                
                FROM товар JOIN шины ON шины.idшины = товар.id_шины 
                JOIN производитель_шин ON шины.id_производителя = производитель_шин.id_vendor_psh 
                JOIN параметры_шин ON шины.id_размеры = параметры_шин.id_параметров 
                JOIN тип_резины ON шины.id_резины = тип_резины.idРезины 
                JOIN диски ON диски.idДиски = товар.id_диски 
                JOIN производитель_дисков ON диски.idvendor = производитель_дисков.id 
                JOIN размер_дисков ON диски.idsize = размер_дисков.idРазмер 
                where id_диски AND id_шины AND idТовар= ${req.params.id}`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    res.json(results)
                })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Error getting tire'})
        }
    }
}

module.exports = new TireController()