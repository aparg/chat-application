import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import peopleImg from "../assets/images/register-page.png";
import { Link } from "react-router-dom";

export const Register = () => {
  const NAME_REGEX = /^[0-9A-Za-z]{6,16}$/;
  const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const errRef = useRef(null);
  const nameRef = useRef(null);
  const pwdRef = useRef(null);
  const confirmPwdRef = useRef(null);

  const [name, setName] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdMatch, setPwdMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const REGISTER_URL = "/register";

  useEffect(() => {
    nameRef.current?.focus();
  }, []);
  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setPwdMatch(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(false);
    setSpinner(true);
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSpinner(false);
      if (response.status === 201) {
        setName("");
        setConfirmPwd("");
        setPwd("");
        setSuccess(true);
      }
    } catch (err) {
      setSpinner(false);
      if (!err?.response) {
        setErrMsg("No response from server");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 409) {
        setErrMsg("Username already exists");
      } else {
        setErrMsg("Login Failed!");
      }
      errRef.current.focus();
    }
  };
  return success ? (
    <section className="text-3xl font-bold">Success</section>
  ) : (
    <div className="flex lg:flex-row w-9/12 flex-col-reverse bg-light-cream">
      <div className="relative flex-auto lg:w-80 w-100">
        <img src={peopleImg} className="w-full h-full "></img>
        <div className="absolute z-10 inset-0 w-full h-full bg-gradient-to-b from-dark-img-gradient to-light-img-gradient"></div>
      </div>
      <section className="flex-auto lg:w-20 flex flex-col items-center justify-center w-100 mx-5">
        <h1 className="text-light-blue font-black text-3xl mt-2">Sign Up</h1>
        <h2 className="text-black mb-5">
          Please login with your personal information
        </h2>
        <section
          className={
            errMsg
              ? "bg-red-300 w-4/5 p-3 rounded mb-2 my-0.5 animate-pop"
              : "absolute left-999"
          }
          aria-live="assertive"
          ref={errRef}
        >
          {errMsg}
        </section>
        <form
          className="w-4/5 flex flex-col items-start m-5"
          onSubmit={handleSubmit}
        >
          <label
            className="text-brown-text tracking-wider font-semibold text-md my-0.5"
            htmlFor="uname"
          >
            Username: &nbsp;
            {validName ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#178a00" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "#b30000" }}
              />
            )}
          </label>
          <input
            type="text"
            id="uname"
            className={`p-1 w-full text-black my-2 ${
              nameFocus ? "bg-dark-cream" : "bg-white"
            }`}
            autoComplete="true"
            value={name}
            aria-invalid={validName ? false : true}
            aria-describedby="uidnote"
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            ref={nameRef}
            required
          ></input>
          {/* /^[0-9A-Za-z]{6,16}$/ */}
          <p
            id="uidnote"
            className={
              !validName && name
                ? "bg-lime-200 text-black p-1 w-full rounded text-sm"
                : "absolute -left-999"
            }
          >
            The username should contain more than 5 letters and less than 17
            letters
          </p>
          <label
            className="text-brown-text tracking-wider font-semibold text-md my-0.5"
            htmlFor="pwd"
          >
            Password: &nbsp;
            {validPwd && pwd ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#178a00" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "#b30000" }}
              />
            )}
          </label>
          <input
            type="password"
            id="pwd"
            className={`p-1 w-full text-black my-2 ${
              pwdFocus ? "bg-dark-cream" : "bg-white"
            }`}
            value={pwd}
            ref={pwdRef}
            aria-invalid={validPwd ? false : true}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            onChange={(e) => setPwd(e.target.value)}
            required
          ></input>
          <p
            id="pwdnote"
            className={
              !validPwd && pwdFocus
                ? "bg-lime-200 text-black p-1 w-full rounded text-sm"
                : "absolute -left-999"
            }
          >
            The password must have minimum eight characters, at least one letter
            and one number
          </p>
          <label
            className="text-brown-text tracking-wider font-semibold text-md my-0.5"
            htmlFor="confirmPwd"
          >
            Confirm Password: &nbsp;
            {confirmPwd && pwdMatch ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#178a00" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "#b30000" }}
              />
            )}
          </label>
          <input
            type="password"
            id="confirmPwd"
            value={confirmPwd}
            ref={confirmPwdRef}
            className={`p-2 w-full text-black my-2 ${
              confirmPwdFocus ? "bg-dark-cream" : "bg-white"
            } `}
            onChange={(e) => setConfirmPwd(e.target.value)}
            onFocus={() => setConfirmPwdFocus(true)}
            onBlur={() => setConfirmPwdFocus(false)}
            required
          ></input>
          <p
            id="confirmNote"
            className={
              !pwdMatch && confirmPwdFocus
                ? "bg-lime-200 text-black p-1 w-full rounded text-sm"
                : "absolute -left-999"
            }
          >
            The password does not match
          </p>
          <button className="w-4/5 bg-gradient-to-r from-dark-blue to-light-blue mt-2 self-center border-none">
            {spinner && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-dark-blue inline fill-white"
                viewBox="0 0 100 101"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}{" "}
            Create Account
          </button>
          <section className="flex w-full justify-center mt-3">
            <span className="inline text-brown-text">
              Already have an account?
            </span>
            <span className="inline text-light-blue hover:cursor-pointer ">
              &nbsp;
              <Link to="/login" className="text-current">
                Login
              </Link>
            </span>
          </section>
        </form>
      </section>
    </div>
  );
};
