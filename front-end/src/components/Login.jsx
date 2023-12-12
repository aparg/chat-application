import { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";
import peopleImg from "../assets/images/login-page.png";
import { Link } from "react-router-dom";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const nameRef = useRef(null);
  const errRef = useRef(null);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [nameFocus, setNameFocus] = useState("");
  const [pwdFocus, setPwdFocus] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [spinner, setSpinner] = useState(false);
  const LOGIN_URL = "/auth";
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(null);
    setSpinner(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ name, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSpinner(false);
      console.log(response?.data?.accessToken);
      const roles = response?.data?.roles;
      console.log(roles);
      setName(""); //clear the form
      setPwd("");
      setSuccess(true);
      setAuth({ user, pwd, roles, accessToken });
    } catch (err) {
      setSpinner(false);
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
    <section className="text-3xl font-bold">Success</section>
  ) : (
    <section className="flex lg:flex-row w-9/12 flex-col-reverse bg-light-cream">
      <div className="relative flex-auto lg:w-80 w-100">
        <img src={peopleImg} className="w-full h-full "></img>
        <h1 className="absolute left-1/2 top-10 -translate-x-1/2 z-10 font-bold text-md text-center m-0">
          Welcome Back
        </h1>
        <div className="absolute z-5 inset-0 w-full h-full bg-gradient-to-b from-dark-img-gradient to-light-img-gradient"></div>
      </div>{" "}
      <section className="flex-auto lg:w-20 flex flex-col items-center justify-center w-100 mx-5">
        <h1 className="text-light-blue font-black text-3xl mt-2">Login</h1>
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
            Username:
          </label>
          <input
            type="text"
            id="uname"
            className={`p-1 w-full text-black my-2 ${
              nameFocus ? "bg-dark-cream" : "bg-white"
            }`}
            autoComplete="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            ref={nameRef}
            required
          ></input>
          <label
            className="text-brown-text tracking-wider font-semibold text-md my-0.5"
            htmlFor="pwd"
          >
            Password: &nbsp;
          </label>
          <input
            type="password"
            id="pwd"
            className={`p-1 w-full text-black my-2 ${
              pwdFocus ? "bg-dark-cream" : "bg-white"
            }`}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            required
          ></input>
          <button className="w-4/5 bg-gradient-to-r from-dark-blue to-light-blue mt-2 self-center">
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
            Submit
          </button>
          <section className="flex w-full justify-center mt-3">
            <span className="inline text-brown-text">
              Don't have an account?
            </span>
            <span className="inline text-light-blue hover:cursor-pointer visited:text-current">
              &nbsp;
              <Link to="/register" className="text-current">
                Register Here
              </Link>
            </span>
          </section>
        </form>
      </section>
    </section>
  );
};

export default Login;
