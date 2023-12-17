class Errorhandler extends Error{
    statusCode: number;
    constructor(errMsg: string, statusCode: number){
        super(errMsg);
        this.statusCode = statusCode;
    }
}

export default Errorhandler;