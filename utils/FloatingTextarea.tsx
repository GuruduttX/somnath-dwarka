export function FloatingTextarea({ label , onChange, value, name}: { label: string, onChange : (e:React.ChangeEvent<HTMLTextAreaElement>)=>void, value : string, name : string}) {
  return (
    <div className="relative">
      <textarea
        rows={3}
        placeholder=" "
        name="message"
        value={value}
        onChange={onChange}
        className="peer w-full rounded-xl border border-gray-300 px-4 pt-5 pb-2
        text-sm outline-none resize-none
        focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
      />
     { !value && <label
        className="absolute left-4 top-3 text-gray-500 text-sm
        transition-all duration-200
        peer-placeholder-shown:top-4
        peer-focus:top-1
        peer-focus:text-xs
        peer-focus:text-orange-600"
      >
        {label}
      </label>}
    </div>
  );
}
