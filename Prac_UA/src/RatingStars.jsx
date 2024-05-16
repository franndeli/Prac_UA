import React, { useState } from 'react';
import './RatingStars.css'; // Asegúrate de tener este archivo en tu proyecto

const RatingStars = ({ onChange }) => {
    const [rating, setRating] = useState(0);

    const handleChangeRating = (newRating) => {
        setRating(newRating);
        onChange(newRating);
    };

    return (
        <div className="rating-container">
            {[1, 2, 3, 4, 5].map((index) => (
                <span key={index} onClick={() => handleChangeRating(index)}>
                    {index <= rating ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default RatingStars;
