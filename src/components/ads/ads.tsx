import React, { useEffect, useState } from 'react';
import ads1 from "../mockuppics/niggafriday.png";
import ads2 from "../mockuppics/cybermonday.png";
import ads3 from "../mockuppics/limitedtime.png";
import './ads.css';

function Ads() {
    const [slideIndex, setSlideIndex] = useState(1);

    useEffect(() => {
        showSlides(slideIndex);
    }, [slideIndex]);

    const plusSlides = (n: number) => {
        let newIndex = slideIndex + n;
        const slides = document.getElementsByClassName("mySlides");

        if (newIndex > slides.length) {
            newIndex = 1;
        } else if (newIndex < 1) {
            newIndex = slides.length;
        }

        setSlideIndex(newIndex);
    };

    const currentSlide = (n: number) => {
        setSlideIndex(n);
    };

    const showSlides = (n: number) => {
        const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
        const dots = document.getElementsByClassName("dot");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (slides[n - 1]) slides[n - 1].style.display = "block";
        if (dots[n - 1]) dots[n - 1].className += " active";
    };

    return (
        <>
            <div className="slideshow-container">
                <div className="mySlides ads-container">
                    <img src={ads1} alt="Ad 1" />
                </div>

                <div className="mySlides ads-container">
                    <img src={ads2} alt="Ad 2" />
                </div>

                <div className="mySlides ads-container">
                    <img src={ads3} alt="Ad 3" />
                </div>

                <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
                <a className="next" onClick={() => plusSlides(1)}>❯</a>
                
                <div className="dot-container">
                    <span className="dot" onClick={() => currentSlide(1)}></span>
                    <span className="dot" onClick={() => currentSlide(2)}></span>
                    <span className="dot" onClick={() => currentSlide(3)}></span>
                </div>
            </div>
        </>
    );
}

export default Ads;
