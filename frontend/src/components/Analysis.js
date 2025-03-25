const Analysis = ({ analysis }) => {
  return (
    <div className="mt-4 p-4 border rounded-md">
      <h3 className="text-lg font-bold">Extracted Text</h3>
      <p className="text-gray-600">{analysis.text_summary || "No text extracted yet."}</p>
    </div>
  );
};

export default Analysis;
