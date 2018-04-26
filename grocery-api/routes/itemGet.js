let exporting = {}

exporting.getAll = function (req, res) {
    let listModel = req.app.locals.listModel;
    listModel.find().exec((err, items) => {
        res.json(items);
    });
}

exporting.getOne = function(req, res) {
    let listModel = req.app.locals.listModel;
    listModel.findOne({_id: req.params.id})
        .exec((err, item) => {
            res.json(item);
        }
    );
}
module.exports = exporting;