package com.cineflix.Cineflix.service;

import com.cineflix.Cineflix.model.Review;
import com.cineflix.Cineflix.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByMovieId(Long movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }
}
