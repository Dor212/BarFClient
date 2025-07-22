import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaUser, FaUsers, FaBuilding, FaUpload, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { TContactFormData } from "../../Types/TContactFromData.ts";
import AboutMe from "../../Imges/AboutMe.png";
import { FaCar } from "react-icons/fa";
import { UploadedClientDocuments } from "../../Types/TDocuments.ts";

type PathwayType = 'single' | 'couple' | 'business';

const HomePage = () => {

    const [selectedPathway, setSelectedPathway] = useState<PathwayType | null>('single');
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({});
    const [nameInput, setNameInput] = useState('');

    const imageSwiper = [
        { url: "/image-swiper/pic6.png", _id: "pic6" },
        { url: "/image-swiper/reason4.png", _id: "pic5" },
        { url: "/image-swiper/reason3.png", _id: "pic4" },
        { url: "/image-swiper/reason2.png", _id: "pic3" },
        { url: "/image-swiper/reason1.png", _id: "pic2" },
        { url: "/image-swiper/4reasons.png", _id: "pic1" },

    ];
        
    const inputDetails: Record<PathwayType, { label: string; placeholder: string }> = {
        single: { label: 'שם מלא', placeholder: 'הזינו את שמכם המלא' },
        couple: { label: 'שם משפחה', placeholder: 'הזינו את שם המשפחה' },
        business: { label: 'שם העסק', placeholder: 'הזינו את שם העסק' },
    };


    const [formData, setFormData] = useState<TContactFormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    useEffect(() => {
        setNameInput('');
    }, [selectedPathway]);

    const currentInput = selectedPathway ? inputDetails[selectedPathway] : null;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/contact`, {
                name: formData.name,
                email: formData.email,
                message: `${formData.message}\n\nטלפון: ${formData.phone}`
            });
            Swal.fire({
                icon: "success",
                title: "נשלח בהצלחה",
                text: "נחזור אליך בהקדם!",
                timer: 1500,
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: "משהו השתבש, נסה שוב.",
                timer: 1500,
            });
        }
    };

    const handleFileUpload = (documentName: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setUploadedFiles(prev => ({
            ...prev,
            [documentName]: files
        }));

        if (files.length > 0) {
            Swal.fire({
                icon: 'success',
                title: 'קובץ נבחר בהצלחה!',
                text: `${files.length} קובץ/ים נבחרו עבור ${documentName}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    const handleSubmitDocument = async () => {
        try {
            const cleanClientName = nameInput.replace(/\s+/g, '');
            const data: UploadedClientDocuments = {
                clientName: cleanClientName,
                files: Object.values(uploadedFiles).flat(),
            };

            const formDataToSend = new FormData();
            data.files.forEach(file => {
                formDataToSend.append("files", file);
            });

            await axios.post(
                `${import.meta.env.VITE_API_URL}/users/documents/upload?name=${encodeURIComponent(data.clientName)}`,
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            Swal.fire({
                icon: "success",
                title: "הקבצים הועלו",
                text: "הקבצים נשמרו בהצלחה",
                timer: 1500,
                willClose: () => {
                    if ("scrollRestoration" in history) {
                        history.scrollRestoration = "manual";
                    }
                    window.location.reload();
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: "העלאת הקבצים נכשלה",
                timer: 1500,
                willClose: () => {
                    if ("scrollRestoration" in history) {
                        history.scrollRestoration = "manual";
                    }
                    window.location.reload();
                }
            });
        }
    };

    const pathways = {
        single: [
            { id: 'single-payslips', name: '3 תלושי שכר אחרונים', multiple: true, optional: false },
            { id: 'single-bank-statement', name: 'עו"ש אחרון', multiple: false, optional: false },
            { id: 'single-accountant-year', name: 'שנה אחרונה מרו"ח', multiple: true, optional: true },
        ],
        couple: [
            { id: 'couple-payslips', name: '3 תלושי שכר אחרונים של 2 בני הזוג', multiple: true, optional: false },
            { id: 'couple-bank-statements', name: 'עו"ש אחרון של כלל החשבונות', multiple: true, optional: false },
            { id: 'couple-accountant-year', name: 'שנה אחרונה מרו"ח', multiple: true, optional: true },
        ],
        business: [
            { id: 'business-tz', name: 'צילום ת.ז של בעל העסק', multiple: false, optional: false },
            { id: 'business-certificate', name: 'צילום תעודת עסק', multiple: false, optional: false },
            { id: 'business-profit-loss', name: 'דוח רווח והפסד מהרו"ח שנתיים אחורה', multiple: true, optional: false },
            { id: 'business-tax-assessment', name: 'שומת מס אחרונה', multiple: false, optional: false },
            { id: 'business-loans', name: 'פירוט הלוואות מחשבון העסק', multiple: true, optional: true },
        ],
    };

    return (
        <div className="w-full min-h-screen pt-20 text-[#3B3024] font-serif"
            style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "right top",
                backgroundAttachment: "fixed",
                backgroundColor: "#FFF8F8",
            }}>
            {/* Social Media Buttons */}
            <div className="fixed-social-buttons">
                <a href="https://wa.me/972525551825" target="_blank" rel="noopener noreferrer" className="bg-green-500 social-icon-button hover:bg-green-600">
                    <FaWhatsapp className="text-3xl" />
                </a>
                <a href="https://www.facebook.com/bar.flyshker?locale=he_IL" target="_blank" rel="noopener noreferrer" className="bg-blue-600 social-icon-button hover:bg-blue-700">
                    <FaFacebook className="text-3xl" />
                </a>
                <a href="https://www.instagram.com/barflyshker/" target="_blank" rel="noopener noreferrer" className="social-icon-button instagram-gradient">
                    <FaInstagram className="text-3xl" />
                </a>
            </div>

            {/* Hero Section */}
            <motion.section id="logo" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
                viewport={{ once: true }} className="h-[100vh] flex items-center justify-center py-2 md:py-0 ">
                <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    src="/backgrounds/BarFLogo.png"
                    alt="Omer Tattoo Studio Logo"
                    className="max-w-[80%] max-h-[80%]"
                />
            </motion.section>

            {/* AboutMe Section */}
            <motion.section
                id="AbouMe"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="container flex flex-col-reverse items-center justify-center gap-10 px-5 py-20 mx-auto md:flex-row"
                dir="rtl"
            >
                <div className="w-full text-center text-[#063942] md:w-1/2 heebo-p1 ">
                    <h2 className="mb-4 text-2xl font-semibold text-[#063942]">היי אני בר פליישקר</h2>
                    <h3 className="mb-4 text-3xl font-bold">יועץ פיננסי מוסמך</h3>
                    <p className="max-w-lg mx-auto mb-8 text-sm leading-relaxed hebrew-content">
                        החיבור שלי לעולם הפיננסים היה שם תמיד,
                        <br />
                        אבל מה שבאמת הניע אותי <br></br> הייתה ההבנה הפשוטה והעוצמתית:
                        <br />
                        ניהול נכון של כסף יכול לשנות חיים,
                        <br></br>
                        לתת שקט, להביא ביטחון, ליצור חופש.
                        <br />
                        <br></br>
                        לאורך השנים צברתי ניסיון מעשי בעולמות הפיננסיים 
                        התחלתי את הדרך שלי לאחר שירות צבאי
                        <br></br> מאתגר ומשמעותי,
                        ומאז הספקתי לעבוד
                        <br /> בבית ההשקעות פסגות בתחום הפנסיוני,
                        <br />בחברת אופקים פיננסיים בתחום המט”ח,
                        <br /> ובחברת חכם לייעוץ משכנתאות והלוואות.
                        <br />
                        <br></br>
                        במקביל, ניהלתי את הכספים שלי בצורה יסודית 
                        <br />עם תקציב אישי מדויק, מעקב שוטף
                        <br></br> ותיק השקעות עצמאי שבניתי צעד אחר צעד.
                        <br></br>
                        עשיתי את זה קודם כל עבור עצמי,
                        <br></br>
                        מתוך הבנה שאי אפשר לייעץ לאחרים באמת <br></br>
                        בלי ליישם את אותם העקרונות בחיים האישיים.
                        <br />
                        אבל דווקא מכל המספרים, האקסלים והטבלאות
                        <br />
                        הבנתי שהשליחות האמיתית שלי היא הקשר האישי.
                        <br />
                        היכולת לדבר בגובה העיניים עם אנשים
                        <br></br>
                        ולעזור להם להבין,
                         לנהל ולכוון את הכסף שלהם בצורה שמתאימה להם.
                        <br /><br /><br />
                        <span className="text-2xl text-[#063942] font-semibold ">
                            אני מלווה היום משפחות צעירות, רווקים ורווקות,
                            <br></br> בעלי ובעלות עסקים.
                            <br />
                            כל אחד ואחת שמרגישים שהגיע הזמן לקחת שליטה על החיים הפיננסיים שלהם.
                            <br />
                        </span>
                    </p>
                    <span className="text-1xl text-[#063942] ">
                        בלי שיפוטיות,
                        בלי מורכבות מיותרת
                        <br></br>
                            פשוט תהליך ברור,
                            מותאם אישית,
                            <br></br> שמביא תוצאות.
                        </span>
                </div>
                <div className="w-full md:w-1/2">
                    <img
                        src={AboutMe}
                        alt="main"
                        className="mx-auto rounded-full w-65 h-65"
                    />
                </div>
            </motion.section>

            {/* Financial Process Section */}
            <motion.section id="process" className="container py-20 mx-auto">
                <Swiper
                    modules={[Navigation, EffectCoverflow]}
                    effect="coverflow"
                    navigation
                    centeredSlides
                    initialSlide={
                        imageSwiper.findIndex((img) => img._id === "pic1") !== -1
                            ? imageSwiper.findIndex((img) => img._id === "pic1")
                            : 0
                    }
                    slidesPerView={"auto"}
                    spaceBetween={20}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    className="mySwiper"
                >
                    {imageSwiper.map((step, index) => (
                        <SwiperSlide key={step._id || index} style={{ width: "300px" }}>
                            <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                                <img
                                    src={step.url}
                                    alt={`Step ${index + 1}`}
                                    className="object-cover w-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.section>

            {/* Articles Section */}
            <motion.section
                id="articles"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="container px-5 py-20 mx-auto text-center"
                dir="rtl"
            >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 heebo-p1">
                    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
                        <div className="mb-4 text-5xl text-[#063942]"><FaCar /></div>
                        <h3 className="mb-2 text-2xl font-semibold text-[#3B3024]">מדריך להתנהלות כלכלית בריאה</h3>
                        <p className="mb-4 text-sm leading-relaxed text-gray-700">ללמוד איך לתכנן ולעקוב אחרי ההוצאות וההכנסות שלכם בצורה יעילה, כדי להשיג שליטה מלאה על הכסף.</p>
                        <a href="/path/to/your/article1.pdf" download className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#D1F96D] rounded-md hover:bg-[#7a9d46] transition-colors duration-200">
                            הורד מאמר
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </a>
                    </div>
                    
                </div>
            </motion.section>

            {/* Documents Upload Section -- MODIFIED -- */}
            <motion.section
                id="documents-upload"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="container px-5 py-20 mx-auto text-center heebo-p1"
                dir="rtl"
            >
                <h2 className="mb-12 text-5xl font-semibold text-[#D1F96D]">בואו נדבר</h2>
                <p className="mb-8 text-[#5A4B36]">אנא בחרו את המסלול המתאים לכם, העלו את המסמכים הנדרשים ואני כבר אצור איתכם קשר בהקדם.</p>

                {/* Pathway Selection - Tabs for Desktop */}
                <div className="justify-center hidden gap-4 mb-8 md:flex">
                    <button onClick={() => setSelectedPathway('single')} className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${selectedPathway === 'single' ? 'bg-[#97BE5A] text-white shadow-lg' : 'bg-gray-200 text-[#3B3024] hover:bg-gray-300'}`}><FaUser className="inline-block ml-2" /> יחיד</button>
                    <button onClick={() => setSelectedPathway('couple')} className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${selectedPathway === 'couple' ? 'bg-[#97BE5A] text-white shadow-lg' : 'bg-gray-200 text-[#3B3024] hover:bg-gray-300'}`}><FaUsers className="inline-block ml-2" /> זוגי</button>
                    <button onClick={() => setSelectedPathway('business')} className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${selectedPathway === 'business' ? 'bg-[#97BE5A] text-white shadow-lg' : 'bg-gray-200 text-[#3B3024] hover:bg-gray-300'}`}><FaBuilding className="inline-block ml-2" /> עסק</button>
                </div>

                {/* Pathway Selection - Accordion for Mobile */}
                <div className="flex flex-col gap-4 mb-8 md:hidden">
                    {['single', 'couple', 'business'].map((path) => (
                        <div key={path} className="overflow-hidden border border-gray-300 rounded-lg">
                            <button onClick={() => setSelectedPathway(path === selectedPathway ? null : path as PathwayType)} className="w-full text-right px-6 py-4 flex items-center justify-between text-lg font-semibold bg-white text-[#3B3024] hover:bg-gray-50 transition-colors duration-300">
                                <span className="flex items-center gap-2">
                                    {path === 'single' && <FaUser />}
                                    {path === 'couple' && <FaUsers />}
                                    {path === 'business' && <FaBuilding />}
                                    {path === 'single' ? 'יחיד' : path === 'couple' ? 'זוגי' : 'עסק'}
                                </span>
                                <span className={`transition-transform duration-300 transform ${selectedPathway === path ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {selectedPathway === path && (
                                <div className="p-6 border-t border-gray-200 bg-gray-50">
                                    {currentInput && (
                                        <div className="mb-6 text-right">
                                            <label className="block mb-2 font-medium text-gray-700">{currentInput.label}</label>
                                            <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder={currentInput.placeholder} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent transition" />
                                        </div>
                                    )}
                                    {pathways[path].map((doc) => (
                                        <div key={doc.id} className="flex flex-col items-center justify-between gap-3 py-4 border-b border-gray-200 sm:flex-row last:border-b-0">
                                            <div className="w-full text-right sm:w-auto">
                                                <span className="font-medium text-[#063942]">{doc.name}</span>
                                                {doc.optional && <span className="mr-2 text-xs text-gray-500">(רשות)</span>}
                                            </div>
                                            <label htmlFor={`${doc.id}-mobile`} className="relative w-full cursor-pointer sm:w-auto">
                                                <input id={`${doc.id}-mobile`} type="file" multiple={doc.multiple} onChange={(e) => handleFileUpload(doc.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                <span className={`inline-flex items-center justify-center w-full px-5 py-2 rounded-md font-medium transition-colors duration-200 ${uploadedFiles[doc.id] ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-white text-[#3B3024] hover:bg-gray-100 border border-gray-300'}`}>
                                                    {uploadedFiles[doc.id] ? <><FaCheckCircle className="ml-2" />{uploadedFiles[doc.id].length} קבצים</> : <><FaUpload className="ml-2" />{doc.multiple ? 'העלה קבצים' : 'העלה קובץ'}</>}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Document List - displayed for desktop tabs */}
                <div className="hidden p-8 bg-white rounded-lg shadow-lg md:block">
                    {currentInput && (
                        <div className="max-w-md mx-auto mb-8 text-right">
                            <label className="block mb-2 font-medium text-gray-700">{currentInput.label}</label>
                            <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder={currentInput.placeholder} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent transition" />
                        </div>
                    )}
                    {selectedPathway && pathways[selectedPathway] && pathways[selectedPathway].map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between max-w-2xl py-4 mx-auto border-b border-gray-200 last:border-b-0">
                            <div className="text-right">
                                <span className="text-lg font-medium text-[#063942]">{doc.name}</span>
                                {doc.optional && <span className="mr-2 text-xs text-gray-500">(רשות)</span>}
                            </div>
                            <label htmlFor={`${doc.id}-desktop`} className="relative cursor-pointer">
                                <input id={`${doc.id}-desktop`} type="file" multiple={doc.multiple} onChange={(e) => handleFileUpload(doc.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <span className={`inline-flex items-center justify-center px-5 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${uploadedFiles[doc.id] ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-gray-100 text-[#3B3024] hover:bg-gray-200 border border-gray-300'}`}>
                                    {uploadedFiles[doc.id] ? <><FaCheckCircle className="ml-2" />{uploadedFiles[doc.id].length} קבצים</> : <><FaUpload className="ml-2" />{doc.multiple ? 'העלה קבצים' : 'העלה קובץ'}</>}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <button
                        onClick={handleSubmitDocument}
                        className="px-10 py-4 text-lg font-semibold text-white transition-colors duration-300 bg-[#97BE5A] rounded-full hover:bg-[#7aa74d] focus:outline-none focus:ring-4 focus:ring-[#D1F96D]"
                    >
                        שלח בקשה
                    </button>
                </div>
            </motion.section>

            {/*Contact us section*/}
            <motion.section
                id="contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="container flex justify-center px-6 py-20 mx-auto heebo-p1"
                dir="rtl"
            >
                <div className="w-full max-w-xl px-10 py-16 bg-[#D1F96D] rounded-[80px] shadow-md flex flex-col items-center">
                    <h2 className="mb-4 text-2xl font-semibold text-center text-[#3B3024]">צרו קשר</h2>
                    <p className="mb-6 text-center text-[#5A4B36] text-sm">יש לכם שאלות? מלאו את הטופס ונחזור אליכם בהקדם.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-4">
                        <div className="w-full max-w-sm">
                            <label className="block mb-1 text-sm text-[#3B3024]">שם מלא</label>
                            <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="השם שלך" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#97BE5A]" />
                        </div>
                        <div className="w-full max-w-sm">
                            <label className="block mb-1 text-sm text-[#3B3024]">כתובת אימייל</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="האימייל שלך" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#97BE5A]" />
                        </div>
                        <div className="w-full max-w-sm">
                            <label className="block mb-1 text-sm text-[#3B3024]">מספר פלאפון</label>
                            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="המספר שלך" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#97BE5A]" />
                        </div>
                        <div className="w-full max-w-sm">
                            <label className="block mb-1 text-sm text-[#3B3024]">הודעה</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="ההודעה שלך" rows={3} className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#97BE5A]"></textarea>
                        </div>
                        <button type="submit" className="w-full max-w-sm px-4 py-3 mt-2 text-sm font-semibold text-[#97BE5A] bg-[#FAF4E7] rounded-md shadow-md hover:bg-[#97BE5A] hover:text-[#FAF4E7]">
                            שלח הודעה
                        </button>
                    </form>
                </div>
            </motion.section>

        </div>
    );
};

export default HomePage;