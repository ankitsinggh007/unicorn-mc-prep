export default function Step1({ formData, onChange, onBlur, errors, touched }) {
  let { name, email } = formData;
  return (
    <>
      <div>
        <label htmlFor="name" className="text-lg text-gray-500">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="px-2 py-1 rounded w-full focus:outline-none border focus:ring-1 focus:ring-blue-400 "
          placeholder="name"
          value={name}
          onBlur={onBlur}
          onChange={onChange}
        />
        <div className="min-h-8">
          {errors.name && touched?.name && (
            <span className="text-red-500">{errors.name}</span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="text-lg text-gray-500">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="px-2 py-1 rounded w-full focus:outline-none border focus:ring-1 focus:ring-blue-400 "
          placeholder="email"
          value={email}
          onBlur={onBlur}
          onChange={onChange}
        />
        {errors.email && touched?.email && (
          <span className="text-red-500">{errors.email}</span>
        )}
      </div>
    </>
  );
}
