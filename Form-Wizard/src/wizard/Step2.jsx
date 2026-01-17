export default function Step2({ formData, onChange, onBlur, errors, touched }) {
  let { password, confirmPassword } = formData;
  return (
    <>
      <div>
        <label htmlFor="Password" className="text-lg  text-gray-500">
          Password
        </label>
        <input
          type="password"
          id="Password"
          name="password"
          className="px-2 py-1 rounded w-full focus:outline-none border focus:ring-1 focus:ring-blue-400 "
          placeholder="Password"
          value={password}
          onBlur={onBlur}
          onChange={onChange}
        />
        <div className="min-h-8">
          {errors.password && touched?.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="text-lg text-gray-500">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="px-2 py-1 rounded w-full focus:outline-none border focus:ring-1 focus:ring-blue-400 "
          placeholder="Confirm Password"
          value={confirmPassword}
          onBlur={onBlur}
          onChange={onChange}
        />
        <div className="min-h-8">
          {errors.confirmPassword && touched?.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword}</span>
          )}
        </div>
      </div>
    </>
  );
}
