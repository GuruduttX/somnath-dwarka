import React from 'react'

interface CMSActionsProps {
  actionType: 'create' | 'update';
  editorType: "Blog" | "Package" | "Temple" | "Pooja" | "Taxi" | "Hotel";
  onSaveDraft: () => void;
  loading?: boolean;
}

const CMSActions = ({
  actionType, editorType,
  onSaveDraft,
  loading = false,
}: CMSActionsProps) => {
  return (
    <div className="mt-10 flex gap-3 items-center">

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 rounded-lg text-sm font-medium
          bg-pink-600/20 text-pink-300 border border-pink-600/40
          hover:bg-pink-600/30 hover:border-pink-500/60 hover:text-pink-200
          transition active:scale-95 cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {actionType === 'update' ? "Update" : "Publish"}
      </button>


     <button
          type="button"
          onClick={onSaveDraft}

          className="px-6 py-2.5 rounded-lg text-sm font-medium
        bg-pink-600/20 text-pink-300 border border-pink-600/40
        hover:bg-pink-600/30 hover:border-pink-500/60 hover:text-pink-200
        transition active:scale-95 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Draft
        </button>
       
      


      <span className="ml-auto text-xs text-pink-500/50 self-center">
        Editing {editorType}
      </span>

    </div>
  );
};

export default CMSActions;