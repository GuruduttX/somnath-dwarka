import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

type Documents = {
  id: string
  description: string
}

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition resize-none
`;

const Document = ({
  documents, setDocuments,
}: {
  documents: Documents[];
  setDocuments: React.Dispatch<React.SetStateAction<Documents[]>>;
  editorType: "Blog" | "Package";
}) => {

  const handleAddDocument = () => {
    setDocuments((prev) => [...prev, { id: crypto.randomUUID(), description: "" }]);
  };

  const handleDocumentChange = (id: string, value: string) => {
    setDocuments((prev) =>
      prev.map((d) => d.id === id ? { ...d, description: value } : d)
    );
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-blue-100 mb-6">Know Before You Go</h3>

      <div className="space-y-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className="border border-blue-900/50 rounded-2xl p-5 bg-blue-950/30"
          >
            <textarea
              rows={3}
              required
              placeholder="Enter the document description"
              className={inputClass}
              value={document.description}
              onChange={(e) => handleDocumentChange(document.id, e.target.value)}
            />

            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDeleteDocument(document.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleAddDocument}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-blue-600/20 text-blue-300 border border-blue-600/40
            hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-200
            transition cursor-pointer"
        >
          <Plus size={15} /> Add Document
        </button>
      </div>

    </div>
  );
};

export default Document;