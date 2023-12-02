import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export const Register = () => {
  const NAME_REGEX = /^[0-9A-Za-z]{6,16}$/;
  const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setPwdMatch(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  return (
    <section className="formDiv">
      <h1 className="formHeading">Register</h1>
      <form className="form">
        <label className="formLabel" htmlFor="uname">
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
          className="inputText"
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
            !validName && name && nameFocus ? "showInstructions" : "hide"
          }
        >
          The username should contain more than 5 letters and less than 17
          letters
        </p>
        <label className="formLabel" htmlFor="pwd">
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
          className="inputText"
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
          className={!validPwd && pwdFocus ? "showInstructions" : "hide"}
        >
          The password must have minimum eight characters, at least one letter
          and one number
        </p>
        <label className="formLabel" htmlFor="confirmPwd">
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
          className="inputText"
          aria-describedby="confirmNote"
          onChange={(e) => setConfirmPwd(e.target.value)}
          onFocus={() => setConfirmPwdFocus(true)}
          onBlur={() => setConfirmPwdFocus(false)}
          required
        ></input>
        <p
          id="confirmNote"
          className={!pwdMatch && confirmPwdFocus ? "showInstructions" : "hide"}
        >
          The password does not match
        </p>
        <button className="submitBtn">Submit</button>
      </form>
    </section>
  );
};
