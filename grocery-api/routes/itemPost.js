module.exports = function (req, res){
    let data = req.body;
    let newItem = new req.app.locals.listModel({
        produkt: data.produkt, 
        kosten: data.kosten,
        erledigt: false}
    )

    newItem.save((err, item) => {
        if(err) res.send(err);
        res.json(item);
    })
}