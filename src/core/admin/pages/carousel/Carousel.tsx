import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "./data";

const Carousel = () => {

  const settings = {
    customPaging: function (i: any) {
      return (
        <div>
          <img src={data[i]} alt=""
            style={{
              height: "50px",
              width: "50px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        </div>
      )
    },

    dots: true,
    cssEase: "linear",
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="container-fluid">
      <h2>Custom Paging</h2>
      <Slider {...settings}>
        {data.map((item) => (
          <div>
            <img
              src={item}
              alt=""
              style={{ width: "100%", height: "50vh" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}


export default Carousel;