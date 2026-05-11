"use client";

interface DeleteConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  open,
  title = "Delete Blog",
  description = "This action cannot be undone. Are you sure?",
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
    
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

     
      <div className="relative z-10 w-full max-w-md rounded-2xl
        bg-gradient-to-br from-[#0b1437] to-[#060b1f]
        border border-white/10 shadow-2xl p-6">

        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl
            bg-white/10 text-white
            hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-xl
            bg-red-600 text-white
            hover:bg-red-500 transition
            disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}