const API_BASE = '/api/movies';

// Fetch and display movies on load
document.addEventListener('DOMContentLoaded', fetchMovies);

async function fetchMovies() {
    try {
        const response = await fetch(API_BASE);
        const movies = await response.json();
        renderMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function renderMovies(movies) {
    const grid = document.getElementById('movieGrid');
    grid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="rating-badge">★ ${movie.rating}</div>
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-genre">${movie.genre}</span>
                <span>${movie.releaseYear}</span>
            </div>
            <p class="movie-desc">${movie.description}</p>
            <button class="btn-glass" onclick="openReviewsModal(${movie.id}, '${movie.title}')">
                View Reviews
            </button>
        </div>
    `).join('');
}

// Modal Functions
function openAddMovieModal() {
    document.getElementById('addMovieModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

async function handleAddMovie(e) {
    e.preventDefault();
    
    const movie = {
        title: document.getElementById('title').value,
        genre: document.getElementById('genre').value,
        releaseYear: parseInt(document.getElementById('year').value),
        rating: parseFloat(document.getElementById('rating').value),
        description: document.getElementById('description').value
    };

    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie)
        });

        if (response.ok) {
            closeModal('addMovieModal');
            e.target.reset();
            fetchMovies();
        }
    } catch (error) {
        console.error('Error adding movie:', error);
    }
}

// Review Functions
async function openReviewsModal(movieId, title) {
    document.getElementById('reviewMovieTitle').textContent = `Reviews: ${title}`;
    document.getElementById('reviewMovieId').value = movieId;
    document.getElementById('reviewsModal').classList.add('active');
    
    fetchReviews(movieId);
}

async function fetchReviews(movieId) {
    try {
        const response = await fetch(`${API_BASE}/${movieId}/reviews`);
        const reviews = await response.json();
        
        const list = document.getElementById('reviewsList');
        if (reviews.length === 0) {
            list.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No reviews yet.</p>';
            return;
        }

        list.innerHTML = reviews.map(review => `
            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong style="color: #00d2ff;">${review.username}</strong>
                    <span style="color: #ffd700;">★ ${review.rating}</span>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${review.comment}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

async function handleAddReview(e) {
    e.preventDefault();
    
    const movieId = document.getElementById('reviewMovieId').value;
    const review = {
        username: document.getElementById('reviewUsername').value,
        comment: document.getElementById('reviewComment').value,
        rating: parseInt(document.getElementById('reviewRating').value)
    };

    try {
        const response = await fetch(`${API_BASE}/${movieId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });

        if (response.ok) {
            document.getElementById('reviewComment').value = '';
            document.getElementById('reviewRating').value = '';
            fetchReviews(movieId);
        }
    } catch (error) {
        console.error('Error adding review:', error);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}
