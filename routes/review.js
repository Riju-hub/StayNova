const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
const Listing=require('../models/listing.js');
const Review=require('../models/review.js');
const {validateReview, isLoggedIn, isReviewAuthor } = require('../Middleware.js');

const reviewController=require('../controllers/reviews.js');

// Add Review
//post route to add review
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

// Delete Review
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;