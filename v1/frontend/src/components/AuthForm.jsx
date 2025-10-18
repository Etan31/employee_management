import InputField from "./InputField";

function AuthForm({ title, fields, onSubmit, submitLabel, className, children}) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            inputClass={field.inputClass}
            labelClass={field.labelClass}
            wrapperClass={field.wrapperClass}
          />
        ))}

        <button type="submit" className="btn submit">{submitLabel}</button>
      </form>
      {children && <div className="auth-extra">{children}</div>}
    </div>
  );
}

export default AuthForm;
