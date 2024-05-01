import React, { Fragment, useRef, useState, useEffect } from "react";
import "../../../sass/components/account/userProfile/userProfileData.scss";
import Input from "../../reuseable/input";
import { PrimaryButton, SecondaryButton } from "../../reuseable/button";
import UserDetail from "./sub-components/userDetail";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AsYouType } from "libphonenumber-js";
import {
  clearErrors,
  updateProfile,
  loadUser,
} from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import Loader from "../../../utils/loader";

const UserProfileData = () => {
  const InputStyle = ["lable-text", "user-name-input"];
  const allClasses = ["lable-btn-text", "savebutton", "cancelbutton"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState(user?.phone || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const [postalCode, setPostalCode] = useState("");
  const [ecommerceImg, setProfileImage] = useState();
  const [preview, setPreview] = useState("/Profile.png");

  const handleLinkClick = () => {
    navigate(`/account`);
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const formattedPhoneNo = phone && phone.replace(/\D/g, "");

    if (formattedPhoneNo && formattedPhoneNo.length !== 11) {
      alert.error("Invalid phone number format");
      return;
    }

    if (postalCode && postalCode.length < 5) {
      alert.error("Pin code should be 5 digits");
      return;
    }
    const formDataObject = {
      name: name,
      lastname: lastName,
      email,
      phonenumber: phone,
      birthday: birthday,
      postalCode: postalCode,
      ecommerceImg: ecommerceImg,
    };

    const myForm = new FormData();

    for (const [key, value] of Object.entries(formDataObject)) {
      if (value) {
        myForm.set(key, value);
      }
    }
    if (user.role === "admin") {
      myForm.set("ecommerceImg", ecommerceImg);
    }
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLastName(user.lastname);
      setEmail(user.email);
      setPreview(user.ecommerceImg.url);
      setPhoneNumber(user.phonenumber);
      setPostalCode(user.postalCode);

      if (user.birthday) {
        const formattedBirthday = new Date(user.birthday)
          .toISOString()
          .split("T")[0];
        setBirthday(formattedBirthday);
      }
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (postalCode && postalCode.length < 5) {
      alert.error("Postal code should be 5 digits");
      return;
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, alert, error, navigate, user, isUpdated]);

  //Phone Number
  const handlePhoneNoChange = (value) => {
    const countryCode = "+31";
    let formattedPhoneNo = value.trim();

    if (!formattedPhoneNo) {
      setPhoneNumber("");
      return;
    }

    if (!formattedPhoneNo.startsWith(countryCode)) {
      formattedPhoneNo = countryCode + formattedPhoneNo;
    }

    const areaCodeLength = formattedPhoneNo.startsWith(countryCode + "0")
      ? 3
      : 2;

    const asYouType = new AsYouType("NL");
    formattedPhoneNo = asYouType.input(formattedPhoneNo);

    formattedPhoneNo =
      formattedPhoneNo &&
      formattedPhoneNo.replace(/\s/g, "").replace(/(\d{2})(\d{7})/, `$1 $2`);

    setPhoneNumber(formattedPhoneNo);
  };

  return (
    <Fragment>
      <div className="profile-title-conatiner">
        <p className="profile-edit-heading">{"Edit Profile"}</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="user-profile-form-data-container container">
            <div className="col-12 user-form-main">
              <form
                className="user-profile-form"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="firast-name-container">
                  <Input
                    htmlFor="firstNameInput"
                    label={"First Name*"}
                    id="InputFirstName"
                    type="text"
                    ariaDescribedBy="firstNameHelp"
                    placeholder="First Name"
                    classes={InputStyle}
                    withLabel={true}
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="last-name-container">
                  <Input
                    labelFor="lastNameInput"
                    label={"Last Name*"}
                    id="InputLastName"
                    type="text"
                    ariaDescribedBy="lastNameHelp"
                    placeholder="Last Name"
                    classes={InputStyle}
                    withLabel={true}
                    name="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="phone-number-container">
                  <Input
                    labelFor="phoneNumberInput"
                    label={"Phone Number*"}
                    id="InputPhoneNumber"
                    type={"tel"}
                    ariaDescribedBy="PhoneNumberHelp"
                    placeholder="Phone Number"
                    classes={InputStyle}
                    withLabel={true}
                    name="phone"
                    value={phone}
                    onChange={(e) => handlePhoneNoChange(e.target.value)}
                  />
                </div>

                <div className="birthDay-container">
                  <Input
                    labelFor="birthDayInput"
                    label={"BirthDay"}
                    id="BirthDayInput"
                    type="date"
                    ariaDescribedBy="BirthDayHelp"
                    dateFormat="MM/dd/yyyy"
                    placeholder="mm/dd/yyyy"
                    classes={InputStyle}
                    name="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>

                <div className="postal-code-container">
                  <Input
                    labelFor="postalcodeInput"
                    label={"Postal Code / Zip Code"}
                    id="InputPostalCode"
                    type={"text"}
                    ariaDescribedBy="PostalCodeHelp"
                    placeholder="Postal Code / Zip Code"
                    classes={InputStyle}
                    withLabel={true}
                    value={postalCode}
                    name="postalcode"
                    onChange={(e) =>
                      setPostalCode(e.target.value.toUpperCase())
                    }
                  />
                </div>

                <div className="email-address-container">
                  <Input
                    labelFor="emailaddressInput"
                    label={"Email Address"}
                    id="Inputemailaddress"
                    type={"text"}
                    readOnly={true}
                    value={email}
                    ariaDescribedBy="EmailAddressHelp"
                    classes={InputStyle}
                    withLabel={true}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    labelDisabled={true}
                  />
                </div>

                {user.role === "admin" && (
                  <div className="product-content" id="createProductFormFile">
                    <input
                      type="file"
                      name="ecommerce"
                      accept="image/*"
                      multiple
                      onChange={updateProfileDataChange}
                    />
                  </div>
                )}

                <div className="button-container">
                  <SecondaryButton
                    type="button"
                    className={allClasses}
                    label={"Cancel"}
                    onClick={handleLinkClick}
                  />
                  <PrimaryButton
                    className={allClasses}
                    label={"Save Changes"}
                    type="submit"
                  />
                </div>

                <div className="email-address-container">
                  <UserDetail backToAccountLink={true} />
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserProfileData;
