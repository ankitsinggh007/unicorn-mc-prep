export default function Step3({ formData, onChange, onBlur, errors, touched }) {
  let { age, city } = formData;
  return (
    <>
      <div>
        <label htmlFor="age" className="text-lg text-gray-500 ">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          className="px-2 text-gray py-1 rounded w-[60%] focus:outline-none border focus:ring-1 focus:ring-blue-400 "
          placeholder="Age"
          value={age}
          onBlur={onBlur}
          onChange={onChange}
        />
        <div className="min-h-8">
          {errors.age && touched?.age && (
            <span className="text-red-500">{errors.age}</span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="city" className="text-lg text-gray-500">
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="px-2 py-1 rounded w-[60%] focus:outline-none border focus:ring-1 focus:ring-blue-400 "
          placeholder="City"
          value={city}
          onBlur={onBlur}
          required
          onChange={onChange}
        />
        <div className="min-h-8">
          {errors.city && touched?.city && (
            <span className="text-red-500">{errors.city}</span>
          )}
        </div>
      </div>
    </>
  );
}
