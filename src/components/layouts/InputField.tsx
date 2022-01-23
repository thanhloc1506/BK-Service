import { useField } from "formik";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  textarea?: boolean;
  className?: string;
}

const InputField = ({ textarea, ...props }: InputFieldProps) => {
  return <></>;
};
