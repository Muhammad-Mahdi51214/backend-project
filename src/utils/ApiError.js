class ApiError extends Error {

    constructor(statusCode,
        message="Something wrong happened",
        error = [],
        stack =""
    )
    {
        super(message),
        this.error = error,
        this.data = null,
        this.statusCode=statusCode,
        this.message = message,
        this.success = false,
        this.error = error
        
        // to keep track of each error
        if(stack)
        {
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor())
        }
    }
}

export {ApiError}