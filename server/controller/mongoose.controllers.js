const CryptoWatcher = require('../model/mongoose.models');

module.exports.findAllCryptoWatchers = (req,res) => {

    CryptoWatcher.find().then((allCryptoWatchers) => {
        res.json({ CryptoWatchers: allCryptoWatchers})
    }).catch((err) => {
        res.status(400).json({ message:"Something went horribly wrong", error: err});
    });

}

module.exports.findOneCryptoWatcher = (req,res) => {
    CryptoWatcher.findOne({_id:req.params.id}).then((oneCryptoWatcher => res.json({ CryptoWatcher: oneCryptoWatcher}))).catch( err => {res.status(400).json({ message:"Something went horribly wrong", error: err});}
    );
}

module.exports.createCryptoWatcher = (req,res) => {
    CryptoWatcher.create(req.body).then(newCryptoWatcher => {
        res.json( { CryptoWatcher: newCryptoWatcher})
    }).catch((err) => {
        res.status(400).json({ message:"Something went horribly wrong", error: err});
    });
}

module.exports.updateCryptoWatcher = (req,res) => {
    CryptoWatcher.findOneAndUpdate({_id:req.params.id}, req.body, { new:true, runValidators:true}).then( updatedCryptoWatcher => {
        res.json( { CryptoWatcher: updatedCryptoWatcher})
    }).catch( err => {
        res.status(400).json({ message:"Something went horribly wrong", error: err});
    });
}

module.exports.deleteCryptoWatcher = (req,res) => {
    CryptoWatcher.findOneAndDelete({_id:req.params.id}).then( result => {
        res.json( {result : result} )}).catch( err => {
            res.status(400).json({ message:"Something went horribly wrong", error: err});
        });
};