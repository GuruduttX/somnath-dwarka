import React from 'react'

const CMSHeader = ({ editorType }: { editorType: string }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-pink-100 flex items-center gap-2">
        ✍️ {editorType} Editor
      </h2>
      <div className="mt-2 h-[2px] w-32 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full" />
    </div>
  )
}

export default CMSHeader