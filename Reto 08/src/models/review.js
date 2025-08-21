import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    punctuation: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    dateReview: {
        type: Date,
        default: Date.now
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }

});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;

