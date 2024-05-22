import React from 'react'
import playStore from "./../../../images/playstore.png"
import appStore from "./../../../images/Appstore.png"
import "./Footer.css";
function Footer() {
  return (
    <footer>
        <div className='leftFooter'>
            <h4>
                DOWNLOAD OUR APP.
            </h4>
            <p>Download app for IOS ANDROID And Mobile Phones</p>
            <img src={playStore} alt='Play Store'></img>
            <img src={appStore} alt='App Store'></img>
        </div>
        <div className='midFooter'>
            <h1>Advertising Hub</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2023 &copy; Nilu</p>1
        </div>
        <div className='rightFooter'>
            <h4>Follow Us</h4>
            <a href='www.goole.com'>Instagram</a>
            <a href='www.goole.com'>Facebook</a>
            <a href='www.goole.com'>Youtube</a>
        </div>
    </footer>
  )
}

export default Footer
