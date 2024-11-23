import { ErrorMessage, Field } from "formik";
import { mainInput, options } from "../../../types/inputs";

const Inputs = ({
  title,
  name,
  type,
  placeholder,
  select,
  options,
  setFieldValue,
  multiple,
}: mainInput) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {title}
      </label>
      {select ? (
        <Field
          as="select"
          name={name}
          id={name}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
        >
          <option selected disabled>
            Select {title}
          </option>
          {options?.map((opt: options, key: number) => (
            <option key={key} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </Field>
      ) : type === "file" ? (
        // Handle file inputs separately
        <input
          type="file"
          name={name}
          id={name}
          multiple={multiple}
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (setFieldValue) {
              if (multiple) {
                setFieldValue(name, event.currentTarget.files);
              } else {
                setFieldValue(name, event.currentTarget.files?.[0]);
              }
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
      ) : (
        // Default Field for other inputs (e.g., text, email)
        <Field
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
      )}
      <ErrorMessage
        component="div"
        className="text-red-700 text-sm"
        name={name}
      />
    </div>
  );
};

export default Inputs;
