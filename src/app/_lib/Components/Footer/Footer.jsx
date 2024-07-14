import React from 'react';
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Dawn,Aurora,News,FM,Herald} from "../../assets/photos/index.js"
import Image from 'next/image'

export default function Footer() {
  return (
    <>
    {/* first footer */}
      <div className="footer">
        <div className="container ">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-lg-2 ">
              <h4>Cars for Sale by Make</h4>
              <a
                href="http://classifieds.dawn.com/honda-cars-for-sale"
                className="footerLinks">
                Honda Cars for Sale
              </a>
              <a
                href="http://classifieds.dawn.com/toyota-cars-for-sale"
                className="footerLinks">
                Toyota Cars for Sale
              </a>
              <a
                href="http://classifieds.dawn.com/mercedes-cars-for-sale"
                className="footerLinks"
              >
                Mercedes Cars for Sale
              </a>
              <a
                href="http://classifieds.dawn.com/bmw-cars-for-sale"
                className="footerLinks"
              >
                BMW Cars for Sale
              </a>
              <a
                href="http://classifieds.dawn.com/suzuki-cars-for-sale"
                className="footerLinks"
              >
                Suzuki Cars for Sale
              </a>
              <a
                href="http://classifieds.dawn.com/daihatsu-cars-for-sale"
                className="footerLinks"
              >
                Daihatsu Cars for Sale
              </a>
            </div>
            <div className="col-md-4 col-sm-6 col-lg-2 ">
              <h4>Cars for Sale by City</h4>
              <a
                href="http://classifieds.dawn.com/cars-for-sale-karachi"
                className="footerLinks"
              >
                Cars for Sale in Karachi
              </a>
              <a
                href="http://classifieds.dawn.com/cars-for-sale-lahore"
                className="footerLinks"
              >
                Cars for Sale in Lahore
              </a>
              <a
                href="http://classifieds.dawn.com/cars-for-sale-islamabad"
                className="footerLinks"
              >
                Cars for Sale in Islamabad
              </a>
            </div>
            <div className="col-md-4 col-sm-6 col-lg-2 ">
              <h4>Real Estate</h4>
              <a
                href="http://classifieds.dawn.com/bungalows-for-sale"
                className="footerLinks"
              >
                Bungalows
              </a>
              <a
                href="http://classifieds.dawn.com/portions-for-sale"
                className="footerLinks"
              >
                Portions
              </a>
              <a
                href="http://classifieds.dawn.com/apartments-for-sale"
                className="footerLinks"
              >
                Apartments
              </a>
              <a
                href="http://classifieds.dawn.com/plots-for-sale"
                className="footerLinks"
              >
                Plots
              </a>
              <a
                href="http://classifieds.dawn.com/commercial-real-estate-for-sale"
                className="footerLinks"
              >
                Commercial Property
              </a>
            </div>
            <div class="col-md-4 col-sm-6 col-lg-2 ">
              <h4>Real Estate by Area</h4>
              <a
                href="http://classifieds.dawn.com/house-for-sale-karachi"
                className="footerLinks"
              >
                Bungalows for Sale in Karachi
              </a>
              <a
                href="http://classifieds.dawn.com/bungalows-for-sale-lahore"
                className="footerLinks"
              >
                Bungalows for Sale in Lahore
              </a>
              <a
                href="http://classifieds.dawn.com/bungalows-for-sale-islamabad"
                className="footerLinks"
              >
                Bungalows for Sale in Islamabad
              </a>
              <a
                href="http://classifieds.dawn.com/flats-for-sale-karachi"
                className="footerLinks"
              >
                Flats for Sale in Karachi
              </a>
              <a
                href="http://classifieds.dawn.com/flats-for-sale-lahore"
                className="footerLinks"
              >
                Flats for Sale in Lahore
              </a>
              <a
                href="http://classifieds.dawn.com/flats-for-sale-islamabad"
                className="footerLinks"
              >
                Flats for Sale in Islamabad
              </a>
            </div>
            <div className="col-md-4 col-sm-6 col-lg-2 ">
              <h4>Jobs by City</h4>
              <a
                href="http://classifieds.dawn.com/jobs-in-karachi"
                className="footerLinks"
              >
                Careers in Karachi
              </a>
              <a
                href="http://classifieds.dawn.com/jobs-in-lahore"
                className="footerLinks"
              >
                Careers in Lahore
              </a>
              <a
                href="http://classifieds.dawn.com/jobs-in-islamabad"
                className="footerLinks"
              >
                Careers in Islamabad
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* second footer */}

      <div className="container" style={{marginTop:"20px",width:"35%", marginBottom:"50px"}}>
        <div className="row ">
          <div className="col-sm-4 col-md-4 col-lg-2">
            <a href="http://dawnnews.tv/" target="_blank">
            <Image src={Dawn} alt="Dawn" width={100} height={100} />
            </a>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-2">
            <a href="http://aurora.dawn.com/" target="_blank">
            <Image src={Aurora} alt="Aurora" width={100} height={100} />
            </a>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-2">
            <a href="http://dawn.com/" target="_blank">
            <Image src={News} alt="News" width={100} height={100} />
            </a>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-2">
            <a href="http://herald.dawn.com/" target="_blank">
            <Image src={Herald} alt="Herald" width={100} height={100} />
            </a>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-2">
            <a href="http://cityfm89.com/" target="_blank">
            <Image src={FM} alt="FM" width={100} height={100} />

            </a>
          </div>
          
        </div>
      </div>
    </>
  )
}
