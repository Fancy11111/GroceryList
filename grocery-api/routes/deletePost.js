module.exports = function(req, res) {
    let listModel = req.app.locals.listModel;
    let id = req.params.id;

    listModel.findOneAndRemove({_id: id}, (err, item) => {
        if(err) res.status(500).json({message: 'database error', err})
        else res.json(item);
    })
}