import React from 'react'

const textareaClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition resize-none
`;

const Policy = ({
  refund, cancel, confirm, payment, onChange,
}: {
  refund: string;
  cancel: string;
  confirm: string;
  payment: string;
  onChange: any;
  editorType: "Blog" | "Package";
}) => {

  const policies = [
    { label: "Refund Policy",       field: "refund",        value: refund },
    { label: "Cancel Policy",       field: "cancel",        value: cancel },
    { label: "Confirmation Policy", field: "confirmation",  value: confirm },
    { label: "Payment Policy",      field: "payment",       value: payment },
  ];

  return (
    <div className="space-y-6 border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-pink-100">
        Policy & Terms and Conditions
      </h3>

      {policies.map(({ label, field, value }) => (
        <div key={field}>
          <label className="text-sm text-pink-300/70">{label}</label>
          <textarea
            required
            rows={5}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            placeholder="Enter policy details..."
            className={textareaClass}
          />
        </div>
      ))}

    </div>
  );
};

export default Policy;