const asyncHandler = (func) => async (req, res, next)=> {

    try{
        await func(req, res, next);
    }
    catch(error){
        res.status(err.status || 500 ).json({
            message: err.message,
            success: false
        })
    }
}