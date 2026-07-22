export function FloatingTextarea({ label , onChange, value, name}: { label: string, onChange : (e:React.ChangeEvent<HTMLTextAreaElement>)=>void, value : string, name : string}) {
  return (
    <div className="relative">
      <textarea
        id={name}
        rows={2}
        placeholder=" "
        name={name}
        value={value}
        onChange={onChange}
        className="peer w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 pt-[18px] pb-1.5
        text-[13px] font-medium text-slate-800 outline-none resize-none transition-colors
        hover:border-slate-300
        focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3.5 top-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400
        transition-all duration-150
        peer-placeholder-shown:top-[18px]
        peer-placeholder-shown:text-[13px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
        peer-focus:top-1.5
        peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:font-semibold
        peer-focus:text-orange-500"
      >
        {label}
      </label>
    </div>
  );
}
