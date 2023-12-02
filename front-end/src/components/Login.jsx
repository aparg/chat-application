const Login = () => {
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // useEffect(() => {
  //   setValidName(NAME_REGEX.test(name));
  // }, [name]);

  // useEffect(() => {
  //   setValidPwd(PWD_REGEX.test(pwd));
  //   setPwdMatch(pwd === confirmPwd);
  // }, [pwd, confirmPwd]);

  return (
    <section className="formDiv">
      <h1 className="formHeading">Login</h1>
      <form className="form">
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
      </form>
    </section>
  );
};
