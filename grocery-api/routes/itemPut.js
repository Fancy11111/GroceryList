module.exports = function(req, res) {
    let listModel = req.app.locals.listModel;
    let data = req.body;
    let id = req.params.id;

    listModel.findOne({_id: id}, function (err, item) {
        if (err) return handleError(err);
        item.produkt = data.produkt || item.produkt;
        item.kosten = data.kosten || item.kosten;
        //item.erledigt = data.erledigt || item.erledigt;
        if(data.erledigt !== undefined) item.erledigt = data.erledigt;
        item.save(function (err, updatedItem) {
            if (err) return handleError(err);
            res.send(updatedItem);
        });
    });
}