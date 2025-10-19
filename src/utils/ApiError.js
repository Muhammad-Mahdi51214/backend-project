class ApiError extends Error {
    constructor(statusCode,
        message="Something wrong happened",
        error = [],
        statck =""
    )
    {
        super(message),
        this.error = error,
        this.data = null,
        this.statusCode,
        this.message = message,
        this.success = false,
        this.error = error
        if(statck)
        {
            this.stack = statck;
        }
        else{
            Error.captureStackTrace(this,this.constructor())
        }
    }
}

export {ApiError}