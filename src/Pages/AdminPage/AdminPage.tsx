import { useEffect, useState } from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../api/axios";

type FileData = {
    filename: string;
    path: string;      
    uploadedAt?: string; 
};

type ClientDocuments = {
    clientName: string;
    files: FileData[];
};

const API_BASE = import.meta.env.VITE_API_URL || "https://api.barflyshker.com";

const AdminPage = () => {
    const [documents, setDocuments] = useState<ClientDocuments[]>([]);
    const [search, setSearch] = useState("");
    const [openFolders, setOpenFolders] = useState<string[]>([]);
    const [loadingFolders, setLoadingFolders] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const { data } = await api.get<ClientDocuments[]>("/users/list");
                if (mounted) setDocuments(data);
            } catch (err) {
                console.error(err);
                toast.error("שגיאה בטעינת המסמכים");
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const toggleFolder = (clientName: string) => {
        setOpenFolders((prev) =>
            prev.includes(clientName)
                ? prev.filter((name) => name !== clientName)
                : [...prev, clientName]
        );
    };

    const handleDeleteClientFolder = async (clientName: string) => {
        const confirmDelete = window.confirm(
            `האם אתה בטוח שברצונך למחוק את כל המסמכים של ${clientName}?`
        );
        if (!confirmDelete) return;

        setLoadingFolders((prev) => [...prev, clientName]);
        try {
            await api.delete(`/users/documents/${encodeURIComponent(clientName)}`);
            setDocuments((prev) =>
                prev.filter((client) => client.clientName !== clientName)
            );
            toast.success(`התיקייה של ${clientName} נמחקה בהצלחה`);
        } catch (err) {
            console.error("שגיאה במחיקת התיקייה:", err);
            toast.error("אירעה שגיאה בעת מחיקת התיקייה.");
        } finally {
            setLoadingFolders((prev) => prev.filter((name) => name !== clientName));
        }
    };

    const handleDownloadZip = (clientName: string) => {
        window.open(
            `${API_BASE}/users/documents/${encodeURIComponent(clientName)}/zip`,
            "_blank"
        );
    };

    const filteredDocs = documents.filter((client) =>
        client.clientName.toLowerCase().includes(search.toLowerCase())
    );

    const totalClients = documents.length;
    const totalFiles = documents.reduce((sum, c) => sum + c.files.length, 0);

    return (
        <div className="container max-w-6xl px-4 py-8 mx-auto mt-20">
            <ToastContainer position="bottom-right" />

            <h1 className="mb-10 text-5xl font-bold text-center text-[#063942]">
                ניהול מסמכי לקוחות
            </h1>

            <div className="flex justify-around p-4 mb-8 border border-gray-200 shadow-lg rounded-xl bg-gradient-to-r from-gray-50 to-white">
                <div><strong>לקוחות:</strong> {totalClients}</div>
                <div><strong>מסמכים:</strong> {totalFiles}</div>
            </div>

            <input
                type="text"
                placeholder="חפש לפי שם לקוח..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full p-3 mb-8 transition border border-gray-300 shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            {isLoading ? (
                <p className="text-xl text-center text-gray-600 animate-pulse">
                    טוען נתונים...
                </p>
            ) : filteredDocs.length === 0 ? (
                <p className="text-center text-gray-600">לא נמצאו לקוחות תואמים.</p>
            ) : (
                filteredDocs.map((client) => (
                    <div
                        key={client.clientName}
                        className="p-4 mb-6 transition border shadow-lg rounded-xl hover:shadow-2xl bg-gradient-to-br from-white to-gray-50"
                    >
                        <button
                            onClick={() => toggleFolder(client.clientName)}
                            className="flex items-center justify-between w-full px-4 py-3 text-xl font-semibold transition-all duration-300 rounded-xl hover:bg-gray-100"
                        >
                            <div className="flex items-center gap-4">
                                <span>
                                    {client.clientName.split(new RegExp(`(${search})`, "gi")).map((part, i) =>
                                        search && part.toLowerCase() === search.toLowerCase() ? (
                                            <mark key={i} className="bg-yellow-200">{part}</mark>
                                        ) : (
                                            <span key={i}>{part}</span>
                                        )
                                    )}{" "}
                                    ({client.files.length})
                                </span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClientFolder(client.clientName);
                                    }}
                                    data-tooltip-id="delTip"
                                    data-tooltip-content="מחק את כל התיקייה"
                                    className="text-lg text-red-600 hover:text-red-800"
                                >
                                    {loadingFolders.includes(client.clientName) ? (
                                        <span className="inline-block w-4 h-4 border-2 border-t-2 border-gray-300 rounded-full loader small border-t-red-600 animate-spin"></span>
                                    ) : (
                                        <MdDelete />
                                    )}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownloadZip(client.clientName);
                                    }}
                                    data-tooltip-id="zipTip"
                                    data-tooltip-content="הורד ZIP"
                                    className="text-lg text-green-600 hover:text-green-800"
                                >
                                    <MdDownload />
                                </button>
                            </div>
                            <span
                                className={`transform transition-transform duration-300 ${openFolders.includes(client.clientName) ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        <div
                            className={`grid grid-cols-2 gap-4 mt-4 md:grid-cols-4 overflow-hidden transition-all duration-500 ${openFolders.includes(client.clientName) ? "max-h-[1000px]" : "max-h-0"
                                }`}
                        >
                            {client.files.map((file) => {
                                const fileUrl = `${API_BASE}${file.path}`;
                                const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.filename); 
                                const isPdf = /\.(pdf)$/i.test(file.filename);
                                const isXls = /\.(xls|xlsx)$/i.test(file.filename);
                                const isDoc = /\.(doc|docx)$/i.test(file.filename);

                                return (
                                    <div
                                        key={file.path}
                                        className="overflow-hidden transition-all duration-300 transform border border-gray-200 shadow-xl rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:scale-105"
                                    >
                                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="block">
                                            {isImage ? (
                                                <img
                                                    src={fileUrl}
                                                    alt={file.filename}
                                                    className="object-cover w-full transition-transform duration-300 h-36 hover:scale-105"
                                                />
                                            ) : isPdf ? (
                                                <div className="flex items-center justify-center w-full text-5xl bg-red-100 h-36">
                                                    📄
                                                </div>
                                            ) : isXls ? (
                                                <div className="flex items-center justify-center w-full text-5xl bg-green-100 h-36">
                                                    📊
                                                </div>
                                            ) : isDoc ? (
                                                <div className="flex items-center justify-center w-full text-5xl bg-blue-100 h-36">
                                                    📝
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-full text-5xl bg-gray-100 h-36">
                                                    📁
                                                </div>
                                            )}
                                            <div className="p-3 text-sm text-center break-words">
                                                {file.filename}
                                                <div className="mt-1 text-xs text-gray-500">
                                                    {file.uploadedAt
                                                        ? new Date(file.uploadedAt).toLocaleDateString("he-IL")
                                                        : ""}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}

            <Tooltip
                id="delTip"
                place="top"
                style={{
                    background: "rgba(30,30,30,0.8)",
                    color: "#fff",
                    backdropFilter: "blur(4px)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "14px",
                }}
            />
            <Tooltip
                id="zipTip"
                place="top"
                style={{
                    background: "rgba(30,30,30,0.8)",
                    color: "#fff",
                    backdropFilter: "blur(4px)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "14px",
                }}
            />
        </div>
    );
};

export default AdminPage;
