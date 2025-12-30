import React from "react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default function FixedSocialButtons() {
    return (
        <div className="fixed-social-buttons">
            <a
                href="https://wa.me/972525551825"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 social-icon-button hover:bg-green-600"
            >
                <FaWhatsapp className="text-2xl md:text-3xl" />
            </a>
            <a
                href="https://www.facebook.com/bar.flyshker?locale=he_IL"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 social-icon-button hover:bg-blue-700"
            >
                <FaFacebook className="text-2xl md:text-3xl" />
            </a>
            <a
                href="https://www.instagram.com/barflyshker/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-button instagram-gradient hover:opacity-95"
            >
                <FaInstagram className="text-2xl md:text-3xl" />
            </a>
        </div>
    );
}
