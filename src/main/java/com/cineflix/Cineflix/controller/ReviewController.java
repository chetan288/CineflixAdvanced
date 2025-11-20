package com.cineflix.Cineflix.controller;

import com.cineflix.Cineflix.model.Review;
import com.cineflix.Cineflix.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies/{movieId}/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<Review> getReviews(@PathVariable Long movieId) {
        return reviewService.getReviewsByMovieId(movieId);
    }

    @PostMapping
    public Review addReview(@PathVariable Long movieId, @RequestBody Review review) {
        review.setMovieId(movieId);
        return reviewService.addReview(review);
    }
}
