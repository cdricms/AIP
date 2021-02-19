const isRequired = (input: string) =>
  input === "" ? "This value is required" : true;

export default isRequired;
