import React, { ReactNode, useEffect, useState } from "react";

interface CarouselProps {
  children: Array<ReactNode>;
  contactLink: Array<string>;
}

const Carousel: React.FC<CarouselProps> = ({ children, contactLink }) => {
  const [position, setPosition] = useState(0);
  const [index, setIndex] = useState(0);

  const goLeft = () => {
    setPosition(position + 100);
    setIndex((index - 1) % children.length);

    if (position === 0) {
      setPosition(-100 * (children.length - 1));
    } else {
      setPosition(position + 100);
    }
  };

  const goRight = () => {
    setIndex((index + 1) % children.length);

    if (position === -100 * (children.length - 1)) {
      setPosition(0);
    } else {
      setPosition(position - 100);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (children.length > 1) {
        goRight();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousels">
        {children.map((item: ReactNode, index: number) => {
          return (
            <div
              key={index}
              className="carousels-content"
              style={{ transform: `translateX(${position}%)` }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="nav-wrapper nav-left">
        <img
          className="navigation-button"
          onClick={goLeft}
          src="/img/carousel/arLeft.svg"
        />
      </div>

      <div className="nav-wrapper nav-right">
        <img
          className="navigation-button"
          onClick={goRight}
          src="/img/carousel/arRight.svg"
        />
      </div>

      <div className="message">
        {contactLink[index] !== "" &&
          <a href={contactLink[index]}>
            <img src="/img/carousel/message.svg" />
          </a>
        }
      </div>

      <style jsx>
        {`
          .carousel-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin: auto;
            width: 95%;
            position: relative;
            border-radius: 1rem;
          }

          .carousels {
            border-radius: 1rem;
            width: 100%;
            height: 300px;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .carousels-content {
            min-width: 100%;
            height: 300px;
            transition: 0.5s;
          }

          .nav-wrapper {
            position: absolute;
            top: 44%;
            padding: 0.8rem;
            z-index: 2;
            background-color: white;
            border-radius: 100%;
          }

          .navigation-button {
            width: 1.5rem;
            height: 1.5rem;
            cursor: pointer;
            transition: filter 0.2s;
          }

          .nav-right {
            right: -1.5rem;
          }

          .nav-left {
            left: -1.5rem;
          }

          .nav-wrapper:hover {
            filter: brightness(75%);
          }


          .message {
            position: absolute;
            background-color: white;
            bottom: 1.5rem;
            right: -3rem;
            padding: 0.5rem;
            border-radius: 100%;
            background: linear-gradient(309.03deg, rgba(205, 187, 255, 0.63) 8.8%, #FBBCC8 51.93%, rgba(205, 187, 255, 0.83) 76.67%);
          }

          .message img {
            width: 3rem;
          }

          @media (max-width: 576px) { 

            .carousel-wrapper {
              width: 90%;
              margin: 0 auto;
            }

            .message {
              right: -1.5rem;
            }

            .message img {
              width: 2rem;
            }
          }
        `}
      </style>
    </div>

  );
};

export default Carousel;
