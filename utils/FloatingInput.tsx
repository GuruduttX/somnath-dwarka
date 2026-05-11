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
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full rounded-xl border border-gray-300 px-4 pt-5 pb-2
        text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
      />
      {!value && <label
        className="absolute left-4 top-3 text-gray-500 text-sm
        transition-all duration-200
        peer-placeholder-shown:top-4
        peer-placeholder-shown:text-sm
        peer-focus:top-1
        peer-focus:text-xs
        peer-focus:text-orange-600"
      >
        {label}{required && " *"}
      </label>}
    </div>
  );
}
