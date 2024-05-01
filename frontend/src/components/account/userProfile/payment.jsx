import React, { Fragment } from 'react'
import "../../../sass/components/account/userProfile/payment.scss"
import Input from '../../reuseable/input'
import CustomSelect from '../../reuseable/select';
import CustomCheckbox from '../../reuseable/checkbox';
import { SecondaryButton, PrimaryButton } from '../../reuseable/button';
import UserDetail from './sub-components/userDetail';
import { useNavigate } from 'react-router-dom';

const Payment = ({ isChecked, handleCheckboxChange }) => {
    const InputStyle = ["lable-text", "payment-input"];
    const checkboxClasses = [" ", "custom_label", "custom_input"];
    const allClasses = ["lable-btn-text", "savebutton", "cancelbutton", "backToAccountLink"];
    const navigate = useNavigate();

    const multipleSelectClasses = [
        "custom-select-container",
        "custom-select-label",
        "custom-select-input-box",
        "selected-option-text",
        "custom-dropdown-icon",
        "custom-options-list",
        "custom-options",
    ];

    const MonthOptions = [
        { value: "month", label: "Month" },
        { value: "Jan", label: "01" },
        { value: "feb", label: "02" },
        { value: "mar", label: "03" },
        { value: "apr", label: "04" },
        { value: "may", label: "05 " },
        { value: "jun", label: "06 " },
        { value: "jul", label: "07" },
        { value: "aug", label: "08" },
        { value: "sep", label: "09" },
        { value: "oct", label: "10" },
        { value: "nov", label: "11" },
        { value: "dec", label: "12" },
    ];

    const YearOptions = [
        { value: "One", label: "Year" },
        { value: "two", label: "24" },
        { value: "three", label: "25" },
        { value: "four", label: "26" },
        { value: "five", label: "27" },
        { value: "six", label: "28" },
        { value: "seven", label: "29" },
        { value: "eight", label: "30" },
        { value: "nine", label: "31" },
        { value: "ten", label: "32" },
        { value: "eleven", label: "33" },
    ]

    const handleLinkClick = () => {
        navigate(`/account`);
    }

    return (
        <Fragment>
            <div className="payment-title-conatiner">
                <p className="payment-edit-heading">
                    {"Add Payment"}
                </p>
            </div>
            <div className="user-payment-form-container container">
                <div className="col-12 user-payment-form-wrapper">
                    <form className='user-address-form'>
                        <div className="card-name-container">
                            <Input
                                htmlFor="cardNameInput"
                                label={"Name on Card*"}
                                id="InputCardName"
                                type="text"
                                ariaDescribedBy="cardNameHelp"
                                placeholder="Name on Card"
                                classes={InputStyle}
                                withLabel={true}
                            />
                        </div>

                        <div className="card-number-container">
                            <Input
                                htmlFor="cardNumberInput"
                                label={"Card Number*"}
                                id="InputCardNumber"
                                type="Number"
                                ariaDescribedBy="cardNumberHelp"
                                placeholder="Card Number"
                                classes={InputStyle}
                                withLabel={true}
                            />
                        </div>
                        <div className="card-expiry-date-container">
                            <div className="card-expiry-month-select">
                                <CustomSelect
                                    labelFor="selectMonthInput"
                                    label="Expiration Month*"
                                    withLabel={true}
                                    placeholder="Month"
                                    options={MonthOptions}
                                    classes={multipleSelectClasses}
                                />

                            </div>
                            <div className="card-expiry-year-select">
                                <CustomSelect
                                    labelFor="selectYearInput"
                                    label="Expiration Year*"
                                    withLabel={true}
                                    placeholder="Year"
                                    options={YearOptions}
                                    classes={multipleSelectClasses}
                                />

                            </div>
                        </div>
                        <div className="payment-checkbox-conatiner">
                            <div className="form-check">
                                <CustomCheckbox
                                    label="Make default payment"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    customCheckboxClasses={checkboxClasses}
                                />
                            </div>
                        </div>

                        <div className="button-container">
                            <SecondaryButton
                                type="button"
                                customClasses={allClasses}
                                label={"Cancel"}
                                onClick={handleLinkClick}
                            />
                            <PrimaryButton
                                type="button"
                                customClasses={allClasses}
                                label={"Save Changes"}
                            />
                        </div>

                        <div className="myAccount-link-container">
                            <UserDetail
                                backToAccountLink={true}
                            />
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment