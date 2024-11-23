import { useEffect, useRef, useState } from "react";
import Cookie from "cookie-universal";

import axios from "axios";
import { REGISTER, baseURL } from "../../../Api/Api";

import { useNavigate } from "react-router-dom";

export default function Register() {
  //  States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Err
  const [err, setErr] = useState("");

  // Ref
  const focus = useRef("");

  // Loading

  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  //   Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //   Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      const token = res.data.token;
      setLoading(false);
      cookie.set("e-commerce", token);
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server ERR");
      }
    }
  }

  return <></>;
}
