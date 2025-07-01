import { useEffect, useState } from "react";
import axios from "axios";

type FileData = {
    filename: string;
    path: string;
};

type ClientDocuments = {
    clientName: string;
    files: FileData[];
};

const AdminPage = () => {
    const [documents, setDocuments] = useState<ClientDocuments[]>([]);
    const [search, setSearch] = useState("");
    const [openFolders, setOpenFolders] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/users/list`)
            .then(res => setDocuments(res.data))
            .catch(err => console.error(err));
    }, []);

    const toggleFolder = (clientName: string) => {
        setOpenFolders(prev =>
            prev.includes(clientName)
                ? prev.filter(name => name !== clientName)
                : [...prev, clientName]
        );
    };

    const filteredDocs = documents.filter(client =>
        client.clientName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container max-w-6xl px-4 py-8 mx-auto mt-20">
            <h1 className="mb-6 text-4xl font-bold text-center">ניהול מסמכי לקוחות</h1>

            <input
                type="text"
                placeholder="חפש לפי שם לקוח..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full p-3 mb-8 border border-gray-300 rounded shadow"
            />

            {filteredDocs.length === 0 ? (
                <p className="text-center text-gray-600">לא נמצאו לקוחות תואמים.</p>
            ) : (
                filteredDocs.map(client => (
                    <div key={client.clientName} className="p-4 mb-6 transition border rounded-lg shadow hover:shadow-lg">
                        <button
                            onClick={() => toggleFolder(client.clientName)}
                            className="flex items-center justify-between w-full text-xl font-semibold"
                        >
                            {client.clientName}
                            <span>{openFolders.includes(client.clientName) ? "▲" : "▼"}</span>
                        </button>

                        {openFolders.includes(client.clientName) && (
                            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
                                {client.files.map(file => (
                                    <div key={file.path} className="overflow-hidden transition border rounded-lg shadow hover:shadow-xl">
                                        <a
                                            href={file.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={file.path}
                                                alt={file.filename}
                                                className="object-cover w-full h-36"
                                            />
                                            console.log(file.path);
                                            
                                            <div className="p-2 text-sm text-center break-words">{file.filename}</div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminPage;
