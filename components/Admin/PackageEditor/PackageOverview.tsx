import React from 'react'
import dynamic from 'next/dynamic';
import "suneditor/dist/css/suneditor.min.css";


const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const PackageOverview = ({
  overview, onChange,
}: {
  overview: string;
  onChange: any;
  editorType: "Blog" | "Package";
}) => {
  return (
    <div className="border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-pink-100 mb-5">
        Package Overview
      </h3>

      <div className="editor-light rounded-xl overflow-hidden border border-pink-900/50 shadow-[0_0_20px_rgba(236,72,153,0.05)] ">
        {/* SunEditor pink overrides */}
        {/* <style>{`
          .sun-editor { background: #1e0b14 !important; border: none !important; }
          .sun-editor .se-toolbar { background: #2a0e1a !important; border-bottom: 1px solid rgba(190,74,106,0.25) !important; }
          .sun-editor .se-btn { color: #f0c4cf !important; }
          .sun-editor .se-btn:hover { background: rgba(190,74,106,0.2) !important; color: #fce8ed !important; }
          .sun-editor .se-wrapper { background: #1e0b14 !important; }
          .sun-editor .se-wrapper .se-wrapper-inner { background: #1e0b14 !important; color: #f5e8eb !important; }
          .sun-editor-editable { background: #1e0b14 !important; color: #f5e8eb !important; caret-color: #e4a0b0; }
          .sun-editor .se-resizing-bar { background: #2a0e1a !important; border-top: 1px solid rgba(190,74,106,0.2) !important; color: #a07080 !important; }
        `}</style> */}
        

        <SunEditor
            
           setContents={overview}
          setOptions={{
            minHeight: "65vh",
            maxHeight: "70vh",
            buttonList: [
              ["undo", "redo"],
              ["formatBlock"],
              ["bold", "italic", "underline"],
              ["list"],
              ["align"],
              ["link", "image"],
              ["table"],
            ],
          }}
          onChange={(value) => onChange("overview", value)}
        />
      </div>
    </div>
  );
};

export default PackageOverview;