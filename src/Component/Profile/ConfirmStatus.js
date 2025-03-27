import React from 'react'
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import useForm from '../../hook/useForm';
import axios from "axios";
import { toast } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

export default function ConfirmStatus(props) {
    // language
    const { i18n, t } = useTranslation();

    // loder
    const { promiseInProgress } = usePromiseTracker();

    const { handleBlur, handleChange, values, errors, handleSubmit, resetForm } = useForm(formRequest); //Final submit function

    // hook
    const navigate = useNavigate();

    // toast message 
    const showToastMessage = (data) => {
        toast.success(data, {
            position: toast.POSITION.TOP_CENTER,
        });
    };
    const showToastMessageone = (data) => {
        toast.error(data, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    // api calling completecropscontact
    function formRequest() {
        const bodyFormData = new FormData();
        bodyFormData.append("contact_id", props.contactid);
        bodyFormData.append("sold_at", values.soldat);
        bodyFormData.append("remarks", values.userremarks);
        const url = `${process.env.REACT_APP_BASE_URL}/completecropscontact`;
        trackPromise(
            axios.post(url, bodyFormData, {
                'Content-Type': 'multipart/form-data', headers: {
                    'Authorization': JSON.parse(localStorage.getItem("token")),
                }
            })
                .then((response) => {
                    if (response.status == 200) {
                        resetForm()
                        showToastMessage(response.data)
                        props.close()
                        props.mydemandfun()
                    }
                }).catch((error) => {
                    if (error.response.status == 422) {
                        const errorData = error.response.data;
                        if (errorData.remarks) showToastMessageone(errorData.remarks[0]);
                        if (errorData.sold_at) showToastMessageone(errorData.sold_at[0]);
                    } else if (error.response.status == 401) {
                        localStorage.removeItem("token");
                        showToastMessageone(error.response.data.message)
                        navigate("/login", { replace: true });
                    }
                })
        )
    }

    return (
        <>
            <Modal
                size="lg"
                show={props.show}
                onHide={props.close}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <h1>Please Submit to Complete {props.headingname}</h1>
                </Modal.Header>
                <Modal.Body>
                    <form className="account-form mb-4" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mb-4">
                                    <label>
                                        {t("confirmstatus.Soldat")}
                                        <span>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder='Sold at'
                                        name="soldat"
                                        value={values.soldat || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                    // step="0.001" // This allows decimal values
                                    />
                                    {errors.soldat && (
                                        <p className="text-red-500 text-sm mt-1">{errors.soldat}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-4">
                                    <label>
                                        {t("confirmstatus.Remarks")}
                                        <span>*</span>
                                    </label>
                                    <textarea
                                        className=" mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                         outline-none"
                                        rows="5"
                                        name="userremarks"
                                        placeholder="Description"
                                        value={values.userremarks || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        autoComplete="off"
                                    />
                                    {errors.userremarks && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.userremarks}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            {promiseInProgress === true ? (
                                <div
                                    className="spinner"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignIitems: "center",
                                        height: "50px",
                                    }}
                                >
                                    <ThreeDots
                                        height="60"
                                        width="60"
                                        color="#063014"
                                        ariaLabel="circles-loading"
                                        wrapperStyle={{}}
                                        wrapperclassName=""
                                        visible={true}
                                    />
                                </div>
                            ) : (
                                <button type="submit" className="w-32 bg-lime-950 text-white py-2 px-4 rounded-full hover:bg-indigo-700">
                                    {t("suppliesanddemandsfiled.Submit")}
                                </button>
                            )}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}