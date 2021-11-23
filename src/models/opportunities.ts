import mongoosePaginate from 'mongoose-paginate';

module.exports = (mongoose: any) => {
    let schema = mongoose.Schema({
        totalSum: Number,
        idList: String,
        date: Date
    }, { autoCreate: true });

    schema.plugin(mongoosePaginate);
    return mongoose.model('Opportunities', schema, 'Opportunities');
};