import { Children } from "react";

export default function WizardForm({
  children,
  currentStep = 0,
  onchangeStep,
  allowedPage,
  totalPage,
  submitHandler,
}) {
  console.log(currentStep, totalPage);

  return (
    <form className="border border-green-300 w-[50%]  flex flex-col gap-12 px-4 py-2 ">
      {!(totalPage === currentStep + 2) && (
        <div className="rounded-full  self-end px-2 py-3 hover:bg-gray-100 shadow-md ">
          {currentStep + 1} / 3
        </div>
      )}
      {children}
      <div className="self-end flex gap-2">
        {!(totalPage === currentStep) && (
          <>
            <button
              onClick={() => onchangeStep(currentStep - 1)}
              disabled={currentStep === 0}
              type="button"
              className={`px-3 py-1.5  text-white rounded-full shadow-md ${
                currentStep === 0
                  ? "bg-gray-200"
                  : "bg-red-400 hover:bg-red-500"
              }`}
            >
              &lt;-
            </button>
            <button
              type="button"
              disabled={currentStep >= allowedPage}
              onClick={
                totalPage === currentStep + 1
                  ? submitHandler
                  : () => onchangeStep(currentStep + 1)
              }
              className={`px-3 py-1.5   text-white shadow-md rounded-full ${
                !(currentStep >= allowedPage) ? "" : "bg-gray-200"
              } bg-blue-400 hover:bg-blue-500`}
            >
              {totalPage === currentStep + 1 ? "Submit" : "->"}
            </button>{" "}
          </>
        )}
      </div>
      {totalPage + 1 === currentStep + 1 && (
        <p className=" self-center font-semibold text-blue-500">
          Sucessfully Submitted 👍
        </p>
      )}
    </form>
  );
}
