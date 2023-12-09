import { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const nameRef = useRef(null);
  const errRef = useRef(null);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const LOGIN_URL = "/auth";
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ name, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data?.accessToken);
      const roles = response?.data?.roles;
      console.log(roles);
      setName(""); //clear the form
      setPwd("");
      setSuccess(true);
      setAuth({ user, pwd, roles, accessToken });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No response from server");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  // useEffect(() => {
  //   setValidName(NAME_REGEX.test(name));
  // }, [name]);

  // useEffect(() => {
  //   setValidPwd(PWD_REGEX.test(pwd));
  //   setPwdMatch(pwd === confirmPwd);
  // }, [pwd, confirmPwd]);

  return success ? (
    <section>Success</section>
  ) : (
    <section className="formDiv">
      <section
        className={errMsg ? "showInsructions" : "hide"}
        aria-live="assertive"
        ref={errRef}
      >
        {errMsg}
      </section>
      <h1 className="formHeading">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="formLabel" htmlFor="uname">
          Username:
        </label>
        <input
          type="text"
          id="uname"
          className="inputText"
          autoComplete="true"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameRef}
          required
        ></input>
        <label className="formLabel" htmlFor="pwd">
          Password: &nbsp;
        </label>
        <input
          type="password"
          id="pwd"
          className="inputText"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        ></input>
        <button className="submitBtn">Submit</button>
      </form>
    </section>
  );
};

export default Login;
