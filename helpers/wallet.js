module.exports = {
    checkWallet: function(req,res,next){
        if (req.user.wallet <= 0) {
            res.render('payment');
        }else{
            return next();
        }
    }
}