const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    date: {type:String,required: true},
    slot: {type:Number,required: true}
});

mongoose.models = {};
export default mongoose.model("Calendar", CalendarSchema);