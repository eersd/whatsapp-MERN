import mongoose from 'mongoose';

const roomScheme=mongoose.Schema({
    name: String
});

export default mongoose.model('rooms', roomScheme);