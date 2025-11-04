function ContactInfoForm({ formData, onChange }) {
  return (
    <div className="form contact-info">
      <label htmlFor="username" className="optional">
        Username
      </label>
      <input
        type="text"
        name="username"
        placeholder="Phone number"
        value={formData.username || ""}
        onChange={onChange}
      />

      <label htmlFor="email" className="required">
        Email
      </label>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={onChange}
      />

      {/* A default pass for creation of account*/}
      <label htmlFor="password" className="readonly">
        Password
      </label>
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
      />

      <label htmlFor="role" className="required">
        Role
      </label>
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={onChange}
      />
    </div>
  );
}

export default ContactInfoForm;
