const CryptoWatcher = require('../model/mongoose.models');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports.findAllCryptoWatchers = (req,res) => {

    CryptoWatcher.find().populate("createdBy", "username email").then((allCryptoWatchers) => {
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
    const user = jwt.verify(req.cookies.userToken, SECRET);

    CryptoWatcher.create({...req.body, createdBy : user._id}).then(newCryptoWatcher => {
        res.json( { CryptoWatcher: newCryptoWatcher})
    }).catch((err) => {
        res.status(400).json({ message:"Something went horribly wrong in create", error: err});
    });
}

module.exports.updateCryptoWatcher = (req,res) => {
    CryptoWatcher.findOneAndUpdate({_id:req.params.id}, req.body, { new:true, runValidators:true}).then( updatedCryptoWatcher => {
        res.json( { CryptoWatcher: updatedCryptoWatcher})
    }).catch( err => {
        res.status(400).json({ message:"Something went horribly wrong in update", error: err});
    });
}

module.exports.deleteCryptoWatcher = (req,res) => {
    CryptoWatcher.findOneAndDelete({_id:req.params.id}).then( result => {
        res.json( {result : result} )}).catch( err => {
            res.status(400).json({ message:"Something went horribly wrong while deleting", error: err});
        });
};