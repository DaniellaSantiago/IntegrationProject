
export default class Opportunities {
    public totalSum: number;
    public idList: String;
    public date: Date;

    constructor
    (
        _totalSum: number,
        _idList: String,
        _date: Date
    ) 
    {
        this.totalSum = _totalSum;
        this.idList = _idList;
        this.date = _date;
    }
}