const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise
        .resolve(requestHandler(req,res,next))
        .catch((error)=>
        {
            next(error)
        })
    }

}


export {asyncHandler}
// const asyncHandler = (func) => async (req, res, next)=> {

//     try{
//         await func(req, res, next);
//     }
//     catch(error){
//         res.status(err.status || 500 ).json({
//             message: err.message,
//             success: false
//         })
//     }
// }