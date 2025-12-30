import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

type SwiperImage = { url: string; _id: string };

export default function ProcessSection() {
    const imageSwiper: SwiperImage[] = [
        { url: "/image-swiper/pic6.png", _id: "pic6" },
        { url: "/image-swiper/reason4.png", _id: "pic5" },
        { url: "/image-swiper/reason3.png", _id: "pic4" },
        { url: "/image-swiper/reason2.png", _id: "pic3" },
        { url: "/image-swiper/reason1.png", _id: "pic2" },
        { url: "/image-swiper/4reasons.png", _id: "pic1" },
    ];

    const initialSlide = imageSwiper.findIndex((img) => img._id === "pic1") !== -1 ? imageSwiper.findIndex((img) => img._id === "pic1") : 0;

    return (
        <div className="overflow-hidden">
            <Swiper
                modules={[Navigation, EffectCoverflow]}
                effect="coverflow"
                navigation
                centeredSlides
                initialSlide={initialSlide}
                slidesPerView={"auto"}
                spaceBetween={20}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                className="mySwiper"
            >
                {imageSwiper.map((step, index) => (
                    <SwiperSlide key={step._id || index} style={{ width: "300px" }}>
                        <motion.div
                            className="overflow-hidden bg-white shadow-lg rounded-xl"
                            whileTap={{ scale: 0.98 }}
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.25 }}
                        >
                            <img src={step.url} alt={`Step ${index + 1}`} className="object-cover w-full" />
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
