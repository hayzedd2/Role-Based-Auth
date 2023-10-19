import React, { useState, useRef, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { PiWarningCircleDuotone, PiCheckCircleDuotone } from "react-icons/pi";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showList, setShowList] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const userRef = useRef();
  const errorRef = useRef();
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasUpperCaseAndNumber, setHasUpperCaseAndNumber] = useState(false);
  useEffect(() => {
    setIsLengthValid(password.length >= 8 && password.length <= 24);
    setHasUpperCaseAndNumber(/[A-Z]/.test(password) && /\d/.test(password));
  }, [password]);
  useEffect(() => {
    if (confirmPassword === password) {
      setPasswordConfirmation(true);
    } else {
      setPasswordConfirmation(false);
    }
  }, [confirmPassword , password]);
  const handleSubmit= async (e)=>{
    e.preventDefault()
    if(!passwordConfirmation || !isLengthValid || !hasUpperCaseAndNumber){
      setErrorMessage('Passwords do not match')
    }else{
      console.log('correct')
      setErrorMessage("")
    }
  }

  return (
    <div className=" min-h-screen w-full  mx-auto flex-col pt-[6rem] md:pt-0 justify-start md:flex-row flex  px-4">
      <div className=" basis-3/6 flex flex-col items-center justify-center">
        <form className="flex flex-col w-full md:w-[27rem] p-1 rounded-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 ">
            <p className="font-lexend text-xl font-medium text-gray-800 ">
              Get Started with Us
            </p>
            <h6 className="font-lexend text-sm mb-9">
              Have an account already ?
              <a className="underline text-blue-500 ml-1" href="">
                Sign In
              </a>
            </h6>
          </div>
          <div className="flex gap-4 md:gap-6 flex-col">
            <div className="email flex flex-col w-full">
             {errorMsg !== "" ?  <p className="mb-7 text-red-700 font-lexend text-sm md:text-[1.15rem">{errorMsg}</p>: null}
              <label className="font-lexend mb-3 text-sm">Email Address</label>
              <input
                className="py-2 px-3 rounded-md border focus:outline-blue-400 focus:bg-white placeholder-gray-200 text-sm border-gray-200 bg-gray-50"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </div>
            <div className="password flex flex-col w-full">
              <label className="font-lexend mb-3 text-sm">Password</label>
              <input
                className="p-2 focus:outline-blue-400 focus:bg-white rounded-md border border-gray-200 bg-gray-50"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                required
              />
              {showList && passwordFocus ? (
                <ul className="flex flex-col gap-3 mt-4">
                  {isLengthValid ? null : (
                    <li className="font-lexend text-sm flex gap-2 items-center">
                      <PiWarningCircleDuotone className="text-lg text-red-700" />
                      Password must be 8-24 characters long
                    </li>
                  )}
                  {hasUpperCaseAndNumber ? null : (
                    <li className="font-lexend text-sm flex gap-2 items-center">
                      <PiWarningCircleDuotone className="text-lg text-red-700" />
                      Must include an Upper-case and a number
                    </li>
                  )}
                </ul>
              ) : null}
            </div>
            <div className="confirm-password flex flex-col w-full">
              <label className="font-lexend mb-3 text-sm">
                Confirm Password
              </label>
              <input
                className="p-2 focus:outline-blue-400 focus:bg-white rounded-md border border-gray-200 bg-gray-50"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocus(true)}
                onBlur={() => setConfirmPasswordFocus(false)}
                required
              />
              {confirmPasswordFocus && !passwordConfirmation ?
                <ul className="mt-4">
                <li className="font-lexend text-sm flex gap-2 items-center">
                  <PiWarningCircleDuotone className="text-lg text-red-700" />
                 Passwords do not match!
                </li>
              </ul>: null
              }
            </div>
          </div>
          <button className="bg-blue-600 text-white hover:ring-2  h-10 rounded-full font-jost w-full mt-8 flex items-center justify-center gap-2">
            Register <BsArrowRight className="font-semibold"/>
          </button>
        </form>
      </div>
      <div className=" flex-col p-4 hidden  md:hidden lg:flex  gap-2.5 basis-3/6 items-center bg-blue-600 justify-center "></div>
    </div>
  );
};

export default SignIn;
