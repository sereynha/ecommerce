export class HttpException extends  Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;
    constructor(message:string,errorCode:ErrorCode,statusCode:number,error:any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
export  enum  ErrorCode{
    NOT_FOUND = 404,
    ALLREADY_EXISTS = 403,
    UNAUTHORIZED = 401,
    UNPROCESSABLE  = 422,
    INTERNAL_EXCEPTION = 500,
}