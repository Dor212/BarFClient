

export default function HomePageStyles() {
    return (
        <style>{`
            html, body { overflow-x: hidden; overscroll-behavior-x: none; }
            #root { overflow-x: hidden; }
            .animated-gradient-border {
                background: linear-gradient(120deg, #063942, #D1F96D, #97BE5A, #063942);
                background-size: 300% 300%;
                animation: borderFlow 6.5s ease-in-out infinite;
                padding: 3px;
            }
            @keyframes borderFlow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animated-gradient-border-inner { background: #FFF8F8; }

            .fixed-social-buttons {
                position: fixed;
                z-index: 70;
                right: 14px;
                bottom: 16px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                transform: translateZ(0);
            }
            .social-icon-button {
                width: 52px;
                height: 52px;
                border-radius: 9999px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: white;
                box-shadow: 0 14px 34px rgba(0,0,0,0.18);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                transform: translateZ(0);
            }
            .instagram-gradient {
                background: radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
            }

            .swiper, .mySwiper { overflow: hidden !important; }
            .swiper-slide { transform: translateZ(0); }

            @media (max-width: 768px) {
                .fixed-social-buttons { right: 12px; bottom: 14px; gap: 8px; }
                .social-icon-button { width: 46px; height: 46px; }
            }
        `}</style>
    );
}
