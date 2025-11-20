package com.cineflix.Cineflix.config;

import com.cineflix.Cineflix.model.Movie;
import com.cineflix.Cineflix.model.Review;
import com.cineflix.Cineflix.repository.MovieRepository;
import com.cineflix.Cineflix.repository.ReviewRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(MovieRepository movieRepository, ReviewRepository reviewRepository) {
        return args -> {
            Movie inception = new Movie(null, "Inception", "Sci-Fi", "A thief who steals corporate secrets through the use of dream-sharing technology.", 2010, 8.8);
            Movie matrix = new Movie(null, "The Matrix", "Sci-Fi", "A computer hacker learns from mysterious rebels about the true nature of his reality.", 1999, 8.7);

            movieRepository.save(inception);
            movieRepository.save(matrix);

            reviewRepository.save(new Review(null, inception.getId(), "Alice", "Mind blowing!", 5));
            reviewRepository.save(new Review(null, matrix.getId(), "Bob", "Classic.", 5));
        };
    }
}
