import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaUser, FaUsers, FaBuilding, FaUpload, FaCheckCircle } from "react-icons/fa";
import { api } from "../../../api/axios";
import type { UploadedClientDocuments } from "../../../Types/TDocuments";
import { SectionTitle } from "../components/SectionTitle";

type PathwayType = "single" | "couple" | "business";

export default function DocumentsUploadSection() {
    const [selectedPathway, setSelectedPathway] = useState<PathwayType | null>("single");
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File[] }>({});
    const [nameInput, setNameInput] = useState("");

    const inputDetails: Record<PathwayType, { label: string; placeholder: string }> = {
        single: { label: "שם מלא", placeholder: "הזינו את שמכם המלא" },
        couple: { label: "שם משפחה", placeholder: "הזינו את שם המשפחה" },
        business: { label: "שם העסק", placeholder: "הזינו את שם העסק" },
    };

    useEffect(() => {
        setNameInput("");
    }, [selectedPathway]);

    const currentInput = selectedPathway ? inputDetails[selectedPathway] : null;

    const handleFileUpload = (documentName: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setUploadedFiles((prev) => ({
            ...prev,
            [documentName]: files,
        }));

        if (files.length > 0) {
            Swal.fire({
                icon: "success",
                title: "קובץ נבחר בהצלחה!",
                text: `${files.length} קובץ/ים נבחרו עבור ${documentName}`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleSubmitDocument = async () => {
        try {
            const cleanClientName = nameInput.replace(/\s+/g, "");
            const data: UploadedClientDocuments = {
                clientName: cleanClientName,
                files: Object.values(uploadedFiles).flat(),
            };

            const formDataToSend = new FormData();
            data.files.forEach((file) => formDataToSend.append("files", file));

            await api.post(`/users/documents/upload?name=${encodeURIComponent(data.clientName)}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire({
                icon: "success",
                title: "הקבצים הועלו",
                text: "הקבצים נשמרו בהצלחה",
                timer: 1500,
                willClose: () => {
                    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
                    window.location.reload();
                },
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "שגיאה",
                text: "העלאת הקבצים נכשלה",
                timer: 1500,
                willClose: () => {
                    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
                    window.location.reload();
                },
            });
        }
    };

    const pathways: Record<PathwayType, Array<{ id: string; name: string; multiple: boolean; optional: boolean }>> = {
        single: [
            { id: "single-payslips", name: "3 תלושי שכר אחרונים", multiple: true, optional: false },
            { id: "single-bank-statement", name: 'עו"ש אחרון', multiple: false, optional: false },
            { id: "single-accountant-year", name: 'שנה אחרונה מרו"ח', multiple: true, optional: true },
        ],
        couple: [
            { id: "couple-payslips", name: "3 תלושי שכר אחרונים של 2 בני הזוג", multiple: true, optional: false },
            { id: "couple-bank-statements", name: 'עו"ש אחרון של כלל החשבונות', multiple: true, optional: false },
            { id: "couple-accountant-year", name: 'שנה אחרונה מרו"ח', multiple: true, optional: true },
        ],
        business: [
            { id: "business-tz", name: "צילום ת.ז של בעל העסק", multiple: false, optional: false },
            { id: "business-certificate", name: "צילום תעודת עסק", multiple: false, optional: false },
            { id: "business-profit-loss", name: 'דוח רווח והפסד מהרו"ח שנתיים אחורה', multiple: true, optional: false },
            { id: "business-tax-assessment", name: "שומת מס אחרונה", multiple: false, optional: false },
            { id: "business-loans", name: "פירוט הלוואות מחשבון העסק", multiple: true, optional: true },
        ],
    };

    return (
        <>
            <SectionTitle title="בואו נדבר" variant="talk" className="mb-8" />

            <p className="mb-8 text-[#5A4B36]">
                אנא בחרו את המסלול המתאים לכם, העלו את המסמכים הנדרשים ואני כבר אצור איתכם קשר בהקדם.
            </p>

            <div className="justify-center hidden gap-4 mb-8 md:flex">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPathway("single")}
                    className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${selectedPathway === "single" ? "bg-[#97BE5A] text-white shadow-lg" : "bg-gray-200 text-[#3B3024] hover:bg-gray-300"
                        }`}
                >
                    <FaUser className="inline-block ml-2" /> יחיד
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPathway("couple")}
                    className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${selectedPathway === "couple" ? "bg-[#97BE5A] text-white shadow-lg" : "bg-gray-200 text-[#3B3024] hover:bg-gray-300"
                        }`}
                >
                    <FaUsers className="inline-block ml-2" /> זוגי
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPathway("business")}
                    className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${selectedPathway === "business" ? "bg-[#97BE5A] text-white shadow-lg" : "bg-gray-200 text-[#3B3024] hover:bg-gray-300"
                        }`}
                >
                    <FaBuilding className="inline-block ml-2" /> עסק
                </motion.button>
            </div>

            <div className="flex flex-col gap-4 mb-8 md:hidden">
                {(["single", "couple", "business"] as PathwayType[]).map((path) => (
                    <div key={path} className="overflow-hidden border border-gray-300 rounded-lg">
                        <button
                            onClick={() => setSelectedPathway(path === selectedPathway ? null : path)}
                            className="w-full text-right px-6 py-4 flex items-center justify-between text-lg font-semibold bg-white text-[#3B3024] hover:bg-gray-50 transition-colors duration-300"
                        >
                            <span className="flex items-center gap-2">
                                {path === "single" && <FaUser />}
                                {path === "couple" && <FaUsers />}
                                {path === "business" && <FaBuilding />}
                                {path === "single" ? "יחיד" : path === "couple" ? "זוגי" : "עסק"}
                            </span>
                            <span className={`transition-transform duration-300 transform ${selectedPathway === path ? "rotate-180" : ""}`}>▼</span>
                        </button>

                        {selectedPathway === path && (
                            <div className="p-6 border-t border-gray-200 bg-gray-50">
                                {currentInput && (
                                    <div className="mb-6 text-right">
                                        <label className="block mb-2 font-medium text-gray-700">{currentInput.label}</label>
                                        <input
                                            type="text"
                                            value={nameInput}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            placeholder={currentInput.placeholder}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent transition"
                                        />
                                    </div>
                                )}

                                {pathways[path].map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex flex-col items-center justify-between gap-3 py-4 border-b border-gray-200 sm:flex-row last:border-b-0"
                                    >
                                        <div className="w-full text-right sm:w-auto">
                                            <span className="font-medium text-[#063942]">{doc.name}</span>
                                            {doc.optional && <span className="mr-2 text-xs text-gray-500">(רשות)</span>}
                                        </div>

                                        <label htmlFor={`${doc.id}-mobile`} className="relative w-full cursor-pointer sm:w-auto">
                                            <input
                                                id={`${doc.id}-mobile`}
                                                type="file"
                                                multiple={doc.multiple}
                                                onChange={(e) => handleFileUpload(doc.id, e)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <motion.span
                                                whileTap={{ scale: 0.98 }}
                                                className={`inline-flex items-center justify-center w-full px-5 py-2 rounded-md font-medium transition-colors duration-200 ${uploadedFiles[doc.id]
                                                        ? "bg-green-100 text-green-700 border border-green-400"
                                                        : "bg-white text-[#3B3024] hover:bg-gray-100 border border-gray-300"
                                                    }`}
                                            >
                                                {uploadedFiles[doc.id] ? (
                                                    <>
                                                        <FaCheckCircle className="ml-2" />
                                                        {uploadedFiles[doc.id].length} קבצים
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaUpload className="ml-2" />
                                                        {doc.multiple ? "העלה קבצים" : "העלה קובץ"}
                                                    </>
                                                )}
                                            </motion.span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="hidden p-8 bg-white rounded-lg shadow-lg md:block">
                {currentInput && (
                    <div className="max-w-md mx-auto mb-8 text-right">
                        <label className="block mb-2 font-medium text-gray-700">{currentInput.label}</label>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder={currentInput.placeholder}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97BE5A] focus:border-transparent transition"
                        />
                    </div>
                )}

                {selectedPathway &&
                    pathways[selectedPathway] &&
                    pathways[selectedPathway].map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between max-w-2xl py-4 mx-auto border-b border-gray-200 last:border-b-0">
                            <div className="text-right">
                                <span className="text-lg font-medium text-[#063942]">{doc.name}</span>
                                {doc.optional && <span className="mr-2 text-xs text-gray-500">(רשות)</span>}
                            </div>

                            <label htmlFor={`${doc.id}-desktop`} className="relative cursor-pointer">
                                <input
                                    id={`${doc.id}-desktop`}
                                    type="file"
                                    multiple={doc.multiple}
                                    onChange={(e) => handleFileUpload(doc.id, e)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <motion.span
                                    whileTap={{ scale: 0.98 }}
                                    className={`inline-flex items-center justify-center px-5 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${uploadedFiles[doc.id]
                                            ? "bg-green-100 text-green-700 border border-green-400"
                                            : "bg-gray-100 text-[#3B3024] hover:bg-gray-200 border border-gray-300"
                                        }`}
                                >
                                    {uploadedFiles[doc.id] ? (
                                        <>
                                            <FaCheckCircle className="ml-2" />
                                            {uploadedFiles[doc.id].length} קבצים
                                        </>
                                    ) : (
                                        <>
                                            <FaUpload className="ml-2" />
                                            {doc.multiple ? "העלה קבצים" : "העלה קובץ"}
                                        </>
                                    )}
                                </motion.span>
                            </label>
                        </div>
                    ))}
            </div>

            <div className="mt-10 text-center">
                <label className="inline-flex items-start gap-2 text-sm">
                    <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-[#063942]/40" />
                    אני מאשר/ת את <a href="/terms" className="underline">תנאי השימוש</a> ואת{" "}
                    <a href="/accessibility" className="underline">מדיניות הפרטיות</a>.
                </label>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitDocument}
                    className="mt-6 px-10 py-4 text-lg font-semibold text-white transition-colors duration-300 bg-[#97BE5A] rounded-full hover:bg-[#7aa74d] focus:outline-none focus:ring-4 focus:ring-[#D1F96D]"
                >
                    שלח בקשה
                </motion.button>
            </div>
        </>
    );
}
