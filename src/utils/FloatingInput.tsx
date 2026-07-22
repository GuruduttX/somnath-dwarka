interface FloatingInputProps {
  label: string;
  type?: string;
  name : string
  value : string;
  onChange : (e:React.ChangeEvent<HTMLInputElement>)=>void,
  required?: boolean;
}

export function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 pt-[18px] pb-1.5
        text-[13px] font-medium text-slate-800 outline-none transition-colors
        hover:border-slate-300
        focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3.5 top-1.5 origin-left text-[10px] font-semibold uppercase tracking-wider text-slate-400
        transition-all duration-150
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
        peer-placeholder-shown:text-[13px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
        peer-focus:top-1.5 peer-focus:translate-y-0
        peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:font-semibold
        peer-focus:text-orange-500"
      >
        {label}{required && <span className="text-orange-500"> *</span>}
      </label>
    </div>
  );
}
