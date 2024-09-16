import React, { useEffect, useState } from 'react';
import './ads.css';

const ads = [
    "https://shippingsea-images.s3.ap-southeast-1.amazonaws.com/ads/blackfriday.png",
    "https://shippingsea-images.s3.ap-southeast-1.amazonaws.com/ads/limitedtime.png",
    "https://shippingsea-images.s3.ap-southeast-1.amazonaws.com/ads/cybermonday.png"
]


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

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            <div className="slideshow-container max-md:hidden mb-3">
                <div className="mySlides ads-container">
                    <img src={ads[0]} alt="Ad 1" />
                    <div className="prev" onClick={() => plusSlides(-1)}>❮</div>
                    <div className="next" onClick={() => plusSlides(1)}>❯</div>
                </div>

                <div className="mySlides ads-container">
                    <img src={ads[1]} alt="Ad 2" />
                    <div className="prev" onClick={() => plusSlides(-1)}>❮</div>
                    <div className="next" onClick={() => plusSlides(1)}>❯</div>
                </div>

                <div className="mySlides ads-container">
                    <img src={ads[2]} alt="Ad 3" />
                    <div className="prev" onClick={() => plusSlides(-1)}>❮</div>
                    <div className="next" onClick={() => plusSlides(1)}>❯</div>
                </div>

                <div className="dot-container">
                    <span className="dot" onClick={() => currentSlide(1)}></span>
                    <span className="dot" onClick={() => currentSlide(2)}></span>
                    <span className="dot" onClick={() => currentSlide(3)}></span>
                </div>
            </div>
            <div className="w-full overflow-x-scroll md:hidden snap-x snap-mandatory mb-2">
                <div className="flex ">
                    <div className="flex transition-transform duration-500 " style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {ads.map((image, index) => (
                            <div key={index} className="flex-shrink-0 w-full ml-10">
                                <img 
                                    src={image} alt={`Slide ${index + 1}`} 
                                    className="w-11/12 snap-center aspect-video rounded-3xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ads;