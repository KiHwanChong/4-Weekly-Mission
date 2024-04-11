import { useState } from "react";
import styles from "./SignForm.module.css";
import eye from "assets/eye.svg";
import eyeOff from "assets/eyeOff.svg";
import Image from "next/image";
import SignButton from "./SignButton";
import SocialSign from "./SocialSign";

interface SignFormProps {
  signup?: boolean;
}

interface InputErrors {
  email: { error: boolean; message: string };
  password: { error: boolean; message: string };
  passwordCheck: { error: boolean; message: string };
}

const SignForm = ({ signup }: SignFormProps) => {
  const [eyeIcon, setEyeIcon] = useState<string>(eye);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: { error: false, message: "" },
    password: { error: false, message: "" },
    passwordCheck: { error: false, message: "" },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { id, value } = e.target;
    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    setInputValues((prevState) => ({ ...prevState, [id]: value }));

    if (id === "email") {
      if (value.length === 0) {
        setInputErrors((prevState) => ({
          ...prevState,
          email: {
            error: true,
            message: "이메일을 입력해주세요.",
          },
        }));
      } else
        setInputErrors((prevState) => ({
          ...prevState,
          email: {
            error: !emailPattern.test(value),
            message: "올바른 이메일을 입력해주세요",
          },
        }));
    } else if (id === "password") {
      if (value.length === 0) {
        setInputErrors((prevState) => ({
          ...prevState,
          password: {
            error: true,
            message: "비밀번호를 입력해주세요.",
          },
        }));
      } else
        setInputErrors((prevState) => ({
          ...prevState,
          password: {
            error: !passwordPattern.test(value),
            message: "영문과 숫자를 포함한 8~25자리 비밀번호를 입력해주세요",
          },
        }));
    } else if (id === "passwordCheck") {
      setInputErrors((prevState) => ({
        ...prevState,
        passwordCheck: {
          error: value !== inputValues.password,
          message: "비밀번호가 일치하지 않습니다",
        },
      }));
    }
  };

  const handlePasswordReveal = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    const passwordCheck = document.getElementById(
      "passwordCheck"
    ) as HTMLInputElement;

    if (password.type === "password") {
      password.type = "text";
      if (passwordCheck) passwordCheck.type = "text";
      setEyeIcon(eyeOff);
    } else {
      password.type = "password";
      if (passwordCheck) passwordCheck.type = "password";
      setEyeIcon(eye);
    }
  };

  return (
    <div
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <form className={styles.form}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          placeholder="codeit@codeit.com"
          onBlur={handleInput}
          className={` ${inputErrors.email.error && styles.errorInput} ${
            styles.input
          }`}
        />
        {inputErrors.email.error && (
          <p className={` ${inputErrors.email.error && styles.errorText}`}>
            {inputErrors.email.message}
          </p>
        )}
      </form>
      <form className={styles.form}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          onBlur={handleInput}
          className={` ${inputErrors.password.error && styles.errorInput} ${
            styles.input
          }`}
        />
        <Image
          width={16}
          height={16}
          src={eyeIcon}
          alt="reveal password"
          className={styles.eye}
          onClick={handlePasswordReveal}
        />
        {inputErrors.password.error && (
          <p className={` ${inputErrors.password.error && styles.errorText}`}>
            {inputErrors.password.message}
          </p>
        )}
      </form>
      {signup && (
        <form className={styles.form}>
          <label htmlFor="passwordCheck">비밀번호</label>
          <input
            type="password"
            id="passwordCheck"
            placeholder="********"
            onBlur={handleInput}
            className={` ${
              inputErrors.passwordCheck.error && styles.errorInput
            } ${styles.input}`}
          />
          <Image
            width={16}
            height={16}
            src={eyeIcon}
            alt="reveal password check"
            className={styles.eye}
            onClick={handlePasswordReveal}
          />
          {inputErrors.passwordCheck.error && (
            <p
              className={` ${
                inputErrors.passwordCheck.error && styles.errorText
              }`}
            >
              {inputErrors.passwordCheck.message}
            </p>
          )}
        </form>
      )}
      <SignButton
        signup={signup}
        inputValues={inputValues}
        inputErrors={inputErrors}
        setInputErrors={setInputErrors}
      />
      <SocialSign signup={signup} />
    </div>
  );
};

export default SignForm;
