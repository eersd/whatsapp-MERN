import mongoose from 'mongoose';

const whatsappScheme=mongoose.Schema({
    room: String,
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

export default mongoose.model('messagecontents', whatsappScheme);