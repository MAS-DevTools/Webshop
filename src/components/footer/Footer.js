import CSSProps from "../../data/constants/CSSProps";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import AppSettings from "../../data/AppSettings";
import DictionaryProps from "../../data/constants/DictionaryProps";

const Footer = () => {
  const [t] = useTranslation(AppSettings.TranslationFilename);
  return (
    <footer className={CSSProps.Footer.Area}>
      <div className="footer-gray">
        <div className="footer-custom">
          <div className="footer-lists">
            <div className="footer-list-wrap">
              <h6 className="ftr-hdr">Contact</h6>
              <ul className="ftr-links-sub">
                <li>070-12345678</li>
              </ul>
              
            </div>

            <div className="footer-list-wrap">
              <h6 className="ftr-hdr">{t(DictionaryProps.Servicedesk)}</h6>
              <ul className="ftr-links-sub">
                <li>
                  <a href="/servicedesk" rel="nofollow">
                  {t(DictionaryProps.ContactUs)}
                  </a>
                </li>
              </ul>
            </div>
            

          </div>

          <div className="footer-email">
            <h6 className="ftr-hdr">
              {t(DictionaryProps.SignUpOffer)}
            </h6>
            <div id="ftr-email" className="ftr-email-form">
              <form
                id="ftrEmailForm"
                method="post"
                
              >
                <div className="error">{t(DictionaryProps.Email)}</div>
                <input
                  type="text"
                  name="email_address_"
                  id="ftrEmailInput"
                  className="input"
                  placeholder="Enter email address"
                />

                <input type="submit" className="button" value="SUBMIT" />
                <input type="hidden" name="country_iso2" value="" />
                <input type="hidden" name="language_iso2" value="en" />
                <input type="hidden" name="site_domain" value="art.com" />
                <input
                  type="hidden"
                  name="email_acq_source"
                  value="01-000001"
                />
                <input
                  type="hidden"
                  name="email_acq_date"
                  value=""
                  id="ftr-email-date"
                />
                <input type="hidden" name="brand_id" value="ART" />
                <input
                  type="hidden"
                  name="_ri_"
                  value="X0Gzc2X%3DWQpglLjHJlYQGnp51yrMf2qXdC9tjU8pzgMtwfYzaVwjpnpgHlpgneHmgJoXX0Gzc2X%3DWQpglLjHJlYQGnyLSq2fzdkuzdzglHMsUhgeNzaSgkk"
                />
              </form>
            </div>

            <div className="ftr-email-privacy-policy"></div>
          </div>

          <div className="footer-social">
            <h6 className="ftr-hdr">{t(DictionaryProps.FollowUs)}</h6>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/"
                  title="Facebook"
                  //onClick="_gaq.push(['_trackSocial', 'Facebook', 'Follow', 'Footer', 'undefined', 'True']);"
                >
                  <img
                    width="24"
                    height="24"
                    alt="Like us on Facebook"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/fb.png"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/"
                  title="Google+"
                  //onClick="_gaq.push(['_trackSocial', 'GooglePlus', 'Follow', 'Footer', 'undefined', 'True']);"
                >
                  <img
                    width="24"
                    height="24"
                    alt="Follow us on Google+"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/gplus.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://pinterest.com/">
                  <img
                    width="24"
                    height="24"
                    alt="Follow us on Pinterest"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/pin-badge.png"
                  />
                </a>
              </li>
              <li>
                <a  href="http://instagram.com/">
                  <img
                    width="24"
                    height="24"
                    alt="Follow us on Instagram"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/instagram-badge.png"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com/"
                  title="Twitter"
                  //onClick="_gaq.push(['_trackSocial', 'Twitter', 'Follow', 'Footer', 'undefined', 'True']);"
                >
                  <img
                    width="67"
                    alt="Follow us on Twitter"
                    src="http://cache1.artprintimages.com/images/jump_pages/rebrand/footer/twitter.png"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-legal">
            <p>
              &copy; E-shop.com Inc. All Rights Reserved. |{" "}
              <a href="/servicedesk" rel="nofollow">
                Privacy Policy
              </a>{" "}
              |{" "}
             
              <a href="/servicedesk" rel="nofollow">
                Terms of Sale
              </a>
            </p>
            <p>
              Trademark E-shop.com Inc.
            </p>
            
          </div>

          <div className="footer-payment">
            <ul>
              <li className="ftr-stella">
                <span
                  title="Stella Service"
                  //onClick="openLink('http://www.stellaservice.com/profile/Art.com/')"
                ></span>
              </li>
              <li>
                <span
                  //onClick="clickTrack(); return false;"
                 // onmouseover="this.style.cursor='pointer'"
                >
                  <img
                    border="0"
                    alt="HACKER SAFE certified sites prevent over 99.9% of hacker crime."
                    src="https://images.scanalert.com/meter/www.art.com/31.gif"
                  />
                </span>
              </li>
              <li className="ftr-bbb">
                <span
                  title="BBB"
                  //onClick="openLink('http://www.bbb.org/raleigh-durham/business-reviews/art-suppliers/artcom-inc-in-raleigh-nc-5001914')"
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
