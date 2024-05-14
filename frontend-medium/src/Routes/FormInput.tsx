const FormInput = (props: any) => {
  const { lable, id, onChange, value, ...inputs } = props;
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="w-[50%] mt-2">
        <label>{lable}</label>
        <input
          className=" border-black border-[1px] p-1 outline-none shadow-none rounded-md w-[100%]"
          {...inputs}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormInput;
