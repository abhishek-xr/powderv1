const API_BASE = "http://127.0.0.1:8000/api"; 

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return response.json();
};

export const parseFile = async (fileId) => {
  const response = await fetch(`${API_BASE}/parse/${fileId}`);
  if (!response.ok) {
    throw new Error("Failed to parse file");
  }
  return response.json(); // { file_id, parsed_text }
};

export const getAnalysis = async (fileId) => {
  const response = await fetch(`${API_BASE}/analysis/${fileId}`);
  if (!response.ok) {
    throw new Error("Failed to get analysis");
  }
  return response.json(); // { file_id, filename, text_summary }
};

export const getDocument = async (fileId) => {
  const response = await fetch(`${API_BASE}/document/${fileId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch document");
  }
  return response.json(); // { file_id, filename, filepath, parsed_text }
};

export const listDocuments = async () => {
  const response = await fetch(`${API_BASE}/documents`);
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  return response.json(); // [{ file_id, filename, filepath, parsed_text }]
};

export const deleteDocument = async (fileId) => {
  const response = await fetch(`${API_BASE}/document/${fileId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete document");
  }
  return response.json(); // { message: "Document deleted successfully" }
};
