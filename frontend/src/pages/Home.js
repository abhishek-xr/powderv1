import { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import { listDocuments } from "../api";

const Home = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fetchDocuments = async () => {
    try {
      const documents = await listDocuments();
      setUploadedFiles(documents);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const handleUploadSuccess = (file) => {
    setUploadedFiles([...uploadedFiles, file]); // Add the uploaded file to the state
  };

  const handleDelete = (fileId) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.file_id !== fileId)); // Remove the deleted file from the state
  };

  useEffect(() => {
    fetchDocuments(); // Fetch all documents on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">File Processing Dashboard</h1>
      </header>
      <main className="flex-grow flex flex-col items-center py-10">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-6xl">
          <FileUpload onUploadSuccess={handleUploadSuccess} />
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">© 2025 Portfolio App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
