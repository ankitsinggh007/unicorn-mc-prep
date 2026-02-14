export default function FormUser({
  formData,
  onBlur,
  onChange,
  onSubmit,
  errors,
  isFormValid,
  submitting,
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col p-2 gap-4 w-96 rounded-md shadow-md bg-white border "
    >
      <h2 className="text-lg font-semibold self-center">User Form</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="name"
          className="px-2 py-1 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={formData.name}
          onChange={(e) => onChange(e)}
          onBlur={onBlur}
          minLength={3}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-500">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="px-2 py-1 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          onBlur={onBlur}
          value={formData.email}
          placeholder="email"
          onChange={(e) => onChange(e)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </div>
      {errors.email && (
        <p id="email-error" className="text-red-500">
          {errors.email}
        </p>
      )}
      <div>
        <label htmlFor="password">Passowrd</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          className="px-2 py-1 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={formData.password}
          minLength={8}
          onChange={(e) => onChange(e)}
          onBlur={onBlur}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" className="text-red-500">
            {errors.password}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          className="px-2 py-1 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder="conform passowrd"
          value={formData.confirmPassword}
          minLength={8}
          onChange={(e) => onChange(e)}
          onBlur={onBlur}
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className="text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          placeholder="age"
          min={18}
          className="px-2 py-1 border rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={formData.age}
          onChange={(e) => onChange(e)}
          onBlur={onBlur}
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? "age-error" : undefined}
        />
        {errors.age && (
          <p id="age-error" className="  text-red-500">
            {errors.age}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`px-1.5 py-3 rounded ${
          isFormValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
        } text-white align-center `}
        disabled={!isFormValid}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
