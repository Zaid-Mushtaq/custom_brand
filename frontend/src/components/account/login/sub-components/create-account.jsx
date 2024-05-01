import React, { useRef, useState, useEffect } from "react";
import "../../../../sass/components/account/login/signIn.scss";
import { PrimaryButton } from "../../../reuseable/button";
import CustomCheckbox from "../../../reuseable/checkbox";
import { Link, useNavigate } from "react-router-dom";
import SocialLinks from "./social-links";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, register } from "../../../../actions/userAction";
import { useAlert } from "react-alert";
import Input from "../../../reuseable/input";
import TermsConditions from "./terms-conditions";

const CreateAccount = ({
  showPassword,
  handleTogglePassword,
  isChecked,
  handleCheckboxChange,
  handleReturnToLogin,
  handleCreateAccountTwo,
  checkoutProps,
}) => {
  const InputStyle = [
    "",
    "custom-input",
    "custom-password-icon-container",
    "custom-eye-icon",
  ];

  const checkboxClasses = [
    "",
    "create_account_checkbox_label",
    "create_account_checkbox_input",
  ];

  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const alert = useAlert();

  const navigate = useNavigate();

  const registerTab = useRef(null);

  const [ecommerceImg, setProfileImage] = useState();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const [preview, setPreview] = useState("/Profile.png");

  const registerDataChange = (e) => {
    if (e.target.name === "ecommerceImg") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          setProfileImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
      alert.success("Crerate Account Successfully");
    }
  }, [dispatch, alert, error, navigate, isAuthenticated]);

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("ecommerceImg", ecommerceImg);
    dispatch(register(myForm));

    // handleCreateAccountTwo();
    setTimeout(() => {
      setUser({
        email: "",
        password: "",
      });
    }, "3000");
  };

  return (
    <div className="createAccount-form-container">
      <div className="__heading-wrapper">
        <h3 className="_heading">Create an account</h3>
        <p className="_create-account-description">
          Enter your details to create a new account
        </p>
      </div>

      <form
        className="create-account-form"
        ref={registerTab}
        encType="multipart/form-data"
        onSubmit={registerSubmit}
      >
        <div className="email-input-container ">
          <Input
            labelFor="emailInput"
            id="InputEmail"
            type="email"
            ariaDescribedBy="emailHelp"
            placeholder="Enter Your Email"
            classes={InputStyle}
            withLabel={false}
            value={email}
            required={true}
            onChange={registerDataChange}
            name="email"
          />
        </div>

        <div className="password-input-container">
          <Input
            labelFor="passwordInput"
            id="InputPassword"
            type={showPassword ? "text" : "password"}
            ariaDescribedBy="passwordHelp"
            placeholder="Enter Your Password"
            classes={InputStyle}
            withLabel={false}
            showPasswordIcon={true}
            handleTogglePassword={handleTogglePassword}
            value={password}
            onChange={registerDataChange}
            required={true}
            name="password"
          />
        </div>

        <div className="password-description-container">
          <p className="password-description-text">
            Password must be a minimum of 8 characters and contain upper and
            lower case letters, ONE special character and at least ONE number.
          </p>
        </div>

        <div className="_checkbox-container">
          <div className="form-check">
            <CustomCheckbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              customCheckboxClasses={checkboxClasses}
            />
            <div className="custom-label-container">
              <p className="custom-label-text">
                By checking this box, you are acknowledging and agreeing to our{" "}
                <Link className="link">terms & conditions</Link> and{" "}
                <Link className="link">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="create-account-button-container">
          <PrimaryButton
            label={"Create Account"}
            customClasses={"create-account-button"}
            type="submit"
          />
        </div>

        <SocialLinks handleCreateAccount={handleReturnToLogin} />

        {!checkoutProps ? (
          <TermsConditions
            handleCreateAccount={handleReturnToLogin}
            dynamicTextProps={"Sign in"}
          />
        ) : null}
      </form>
    </div>
  );
};

export default CreateAccount;
