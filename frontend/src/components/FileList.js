import { useState } from "react";
import { getDocument, deleteDocument } from "../api";

const FileList = ({ files, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showParsedText, setShowParsedText] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFetchAndPreview = async (fileId) => {
    try {
      const file = await getDocument(fileId);
      setSelectedFile(file);
      setShowPreview(true);
    } catch (error) {
      console.error("Failed to fetch document:", error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await deleteDocument(fileId);
      onDelete(fileId); // Notify parent component to update the list
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const handleShowParsedText = (file) => {
    setSelectedFile(file);
    setShowParsedText(true);
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Uploaded Files</h3>
      <ul className="space-y-4">
        {files.map((file) => (
          <li
            key={file.file_id}
            className="p-4 border rounded-lg shadow-md bg-white flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            <span className="font-medium text-gray-700">{file.filename}</span>
            <div className="flex space-x-4">
              <button
                onClick={() => handleFetchAndPreview(file.file_id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Preview
              </button>
              <button
                onClick={() => handleShowParsedText(file)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Parsed Text
              </button>
              <button
                onClick={() => handleDelete(file.file_id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* PDF Preview Modal */}
      {showPreview && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fade-in">
          <div className="bg-white p-6 rounded shadow-lg max-w-7xl w-full relative">
            <h3 className="text-lg font-bold mb-4 text-center">
              PDF Preview: {selectedFile.filename}
            </h3>
            <iframe
              src={`http://127.0.0.1:8000/uploads/${selectedFile.filepath}`}
              title="PDF Preview"
              className="w-full h-[800px] border rounded" // Increased height for better visibility
            ></iframe>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                onClick={() => setShowParsedText(true)}
              >
                Show Parsed Text
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={() => setShowPreview(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parsed Text Modal */}
      {showParsedText && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fade-in">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <h3 className="text-lg font-bold mb-4 text-center">Parsed Text</h3>
            <div className="overflow-y-auto max-h-64 border p-4 rounded bg-gray-50">
              {selectedFile.parsed_text || "No parsed text available"}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={() => setShowParsedText(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileList;
