function log (req, res, next){
    console.log('logging....')
    next();//Passes to next middle where function
    }

    module.exports =log;