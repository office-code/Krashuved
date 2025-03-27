import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import useForm from "../../hook/useForm";
import axios from "axios";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import Dropzone from "react-dropzone"; // Import the Dropzone component
import { useTranslation } from "react-i18next";
import { MdOutlineDelete } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from 'react-bootstrap/Button';
import 'swiper/css';
import 'swiper/css/navigation';
import "./createcrop.css"
import { BsCameraVideoOff, BsUpload } from "react-icons/bs";

// import required modules
import { Navigation } from "swiper/modules";

export default function UpdateCrop(props) {
    // language 
    const { i18n, t } = useTranslation();

    //loder
    const { promiseInProgress } = usePromiseTracker();

    //hooks
    const navigate = useNavigate();

    //useForm function
    const { handleBlur, handleChange, values, errors, handleSubmit, setValues } = useForm(formRequest); //Final submit function

    // state
    const [SellingStatus, setSellingStatus] = useState(props.SellingStatus);
    const [GradingType, setGradingType] = useState("");
    const [Unit, setUnit] = useState("");
    const [Categorydata, setCategorydata] = useState([]);
    const [carid, setCarid] = useState("");
    const [chipspassdata, setChipsPassData] = useState([])
    const [chipspassid, setChipsPassId] = useState("")
    const [cropvariety, setCropvariety] = useState([]);
    const [cropvarietytitle, setCropvarietytitle] = useState("");
    const [imagesUpload, setImagesUpload] = useState([]);
    const [show_image, setshow_image] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [getvideo, setGetVideo] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [getcropupdatestate, setGetCropUpdateState] = useState(false)
    const [cropid, setCropid] = useState();
    const [showdeletepoup, setShowDeletePoup] = useState(false);
    const [cropphotolist, setCropPhotoList] = useState([])
    const [deletestatus, setdeletestatus] = useState(false);
    const MAX_FILE_SIZE_MB = 6;
    const MAX_FILES = 4;

    // onchange function
    const handleGradingTypeChange = (e) => setGradingType(e.target.value);
    const handleUnitChange = (e) => setUnit(e.target.value);
    const handleCaridChange = (e) => setCarid(e.target.value);
    function handleClose() { setShowDeletePoup(false) };

    // toast message function
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

    // getcropdetailsupdateapi calling function
    useEffect(() => {
        if (props.cropid) {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/getcropsdetailtoupdate/${props.cropid}`)
                .then((response) => {
                    setValues({
                        cropname: response.data[0].crops_name,
                        cropdiscri: response.data[0].crops_description,
                        ratefrom: response.data[0].rate_from,
                        rateto: response.data[0].rate_to,
                        quantity: response.data[0].quantity,
                        cropssize: response.data[0].crops_size,
                    });
                    setUnit(response.data[0].unit)
                    setGradingType(response.data[0].grading_type)
                    setCarid(response.data[0].crops_category)
                    setCropvarietytitle(response.data[0].crops_variety)
                    setChipsPassId(response.data[0].chips_pass)
                    setGetVideo(response.data[0].crops_video)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }, [props.cropid, setValues, getcropupdatestate]);

    // api list dropdown 1
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/cropvarietylist`)
            .then((response) => {
                if (response.status == 200) {
                    setCropvariety(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // api list dropdown 2
    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/cropcategorylist`,
        };
        axios
            .request(config)
            .then((response) => {
                setCategorydata(response.data);
            })
            .catch((error) => {
                console.log("eror");
            });
    }, []);

    // api list dropdown 2
    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/chipspasslist`,
        };
        axios
            .request(config)
            .then((response) => {
                setChipsPassData(response.data);
            })
            .catch((error) => {
                console.log("eror");
            });
    }, []);


    // image upload function 
    const upload = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            showToastMessage("Please select image.");
            return;
        }
        const errorMessages = [];
        const validFiles = await Promise.all(
            acceptedFiles.map(async (file) => {
                const isImageTypeValid =
                    file.type.includes("image/jpeg") ||
                    file.type.includes("image/png") ||
                    file.type.includes("image/jpg");
                const isImageSizeValid = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;
                const isImageDimensionsValid = await validateImageSize(file);
                if (!isImageTypeValid) {
                    errorMessages.push(
                        "Invalid image type. Please upload JPEG, PNG, or JPG images."
                    );
                }
                if (!isImageSizeValid) {
                    errorMessages.push(
                        `Image size exceeds the maximum allowed (${MAX_FILE_SIZE_MB}MB).`
                    );
                }
                return isImageTypeValid && isImageSizeValid && isImageDimensionsValid;
            })
        );

        if (errorMessages.length > 0) {
            showToastMessage(errorMessages.join(" "));
            return;
        }

        const validFilesArray = acceptedFiles.filter(
            (file, index) => validFiles[index]
        );

        if (validFilesArray.length === 0) {
            showToastMessage(
                "No valid images selected. Please check file types, sizes, and dimensions."
            );
            return;
        }

        setImagesUpload((prevImages) => [...prevImages, ...validFilesArray]);
        setshow_image((prevImages) => [
            ...prevImages,
            ...validFilesArray.map((file) => URL.createObjectURL(file))
        ]);
    };

    const validateImageSize = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const isValidSize = img.width && img.height;
                resolve(isValidSize);
            };
        });
    };

    const uploadImage = (event) => {
        const videoFile = event.target.files[0];
        const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
        if (videoFile.size > MAX_SIZE) {
            setErrorMessage(`${videoFile.name} is larger than 10 MB.`);
        } else if (!videoFile.name.match(/\.(mp4|mp3|)$/)) {
            showToastMessage(`${videoFile.name} is not an allowed format. Only .mp4 and .mp3 are allowed.`);
            return false;
        } else {
            setSelectedFiles(videoFile);
        }
    }

    // cropsphotolist calling api 
    useEffect(() => {
        if (props.cropid) {
            const bodyFormData = new FormData();
            bodyFormData.append("crops_id", props.cropid);
            const url = `${process.env.REACT_APP_BASE_URL}/cropsphotolist`;
            trackPromise(
                axios.post(url, bodyFormData, {
                    'Content-Type': 'multipart/form-data', headers: {
                        'Authorization': JSON.parse(localStorage.getItem("token")),
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            setCropPhotoList(response.data)
                        }
                    }).catch((error) => {
                        if (error.response.status == 401) {
                            localStorage.removeItem("token");
                            showToastMessageone(error.response.data.message)
                            navigate("/login", { replace: true });
                        }
                    })
            )
        }
    }, [deletestatus, props.cropid, getcropupdatestate])


    // handleDelete calling api 
    function handleDelete(id) {
        const bodyFormData = new FormData();
        bodyFormData.append("id", id);
        const url = `${process.env.REACT_APP_BASE_URL}/deletecropsphoto`;
        axios.post(url, bodyFormData, {
            'Content-Type': 'multipart/form-data', headers: {
                'Authorization': JSON.parse(localStorage.getItem("token")),
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setShowDeletePoup(false)
                    setdeletestatus(!deletestatus);
                    showToastMessage(response.data)
                } else if (response.status == 201) {
                    setShowDeletePoup(false)
                    showToastMessageone(response.data.message)
                }
            }).catch((error) => {
                if (error.response.status == 401) {
                    localStorage.removeItem("token");
                    showToastMessageone(error.response.data.message)
                    navigate("/login", { replace: true });
                }
            })
    }

    // updatecrop calling api 
    function formRequest() {
        const bodyFormData = new FormData();
        bodyFormData.append("crops_name", values.cropname);
        bodyFormData.append("crops_description", values.cropdiscri);
        bodyFormData.append("quantity", values.quantity);
        bodyFormData.append("crops_variety", cropvarietytitle);
        bodyFormData.append("unit", Unit);
        bodyFormData.append("grading_type", GradingType);
        bodyFormData.append("crops_size", values.cropssize);
        bodyFormData.append("crops_category", carid);
        bodyFormData.append("crops_id", props.cropid);
        bodyFormData.append("chips_pass", chipspassid);
        if (props.cropname === "Demand") {
            bodyFormData.append(`crops_photo[]`, "");
            bodyFormData.append(`crops_video`, "");
        } else {
            imagesUpload.forEach((file) => {
                bodyFormData.append(`crops_photo[]`, file);
            });
            bodyFormData.append(`crops_video`, selectedFiles);
        }
        bodyFormData.append("rate_from", values.ratefrom);
        bodyFormData.append("rate_to", values.rateto);
        const url = `${process.env.REACT_APP_BASE_URL}/updatecrop`;
        trackPromise(
            axios
                .post(url, bodyFormData, {
                    "Content-Type": "multipart/form-data",
                    headers: {
                        Authorization: JSON.parse(localStorage.getItem("token")),
                    },
                })
                .then((response) => {
                    if (response.status == 200) {
                        props.close();
                        props.mydemandfun();
                        setImagesUpload([]);
                        setshow_image([]);
                        showToastMessage(response.data);
                        setGetCropUpdateState(!getcropupdatestate);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const errorData = error.response.data;
                        if (errorData.crops_image) showToastMessageone(errorData.crops_image[0]);
                        if (errorData.selling_status) showToastMessageone(errorData.selling_status[0]);
                        if (errorData.grading_type) showToastMessageone(errorData.grading_type[0]);
                        if (errorData.crops_category) showToastMessageone(errorData.crops_category[0]);
                        if (errorData.crops_variety) showToastMessageone(errorData.crops_variety[0]);
                        if (errorData.chips_pass) showToastMessageone(errorData.chips_pass[0]);
                        if (errorData.unit) showToastMessageone(errorData.unit[0]);
                        if (errorData.crops_name) showToastMessageone(errorData.crops_name[0]);
                        if (errorData.crops_description) showToastMessageone(errorData.crops_description[0]);
                        if (errorData.quantity) showToastMessageone(errorData.quantity[0]);
                        if (errorData.crops_size) showToastMessageone(errorData.crops_size[0]);
                        if (errorData.rate_from) showToastMessageone(errorData.rate_from[0]);
                        if (errorData.rate_to) showToastMessageone(errorData.rate_to[0]);
                    }
                    else if (error.response.status == 401) {
                        localStorage.removeItem("token");
                        showToastMessageone(error.response.data.message)
                        navigate("/login", { replace: true });
                    }
                })
        );
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
                    <div className="mb-4 text-center">
                        <h1 className="text-lg">Create {props.cropname} </h1>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form className="account-form mb-4" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.CorpName")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md
                                        bg-white outline-none font-medium text-black"
                                        name="cropname"
                                        value={values.cropname || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        autoComplete="off"
                                    />
                                    {errors.cropname && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cropname}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6 invisible hidden">
                                <div className="form-group  mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        Selling Status<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none"
                                        name="SellingStatus"
                                        value={SellingStatus}
                                        onChange={(e) => setSellingStatus(e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.GradingType")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="GradingType"
                                        id="GradingType"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none color-red"
                                        value={GradingType}
                                        onChange={handleGradingTypeChange}
                                    >
                                        <option>Select Grading Type</option>
                                        <option value="gate_cut">Gate Cut</option>
                                        <option value="bilty_cut">Bilty Cut</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.Quantity")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        name="quantity"
                                        value={values.quantity || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.Unit")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="Unit"
                                        id="Unit"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none"
                                        value={Unit}
                                        onChange={handleUnitChange}
                                    >
                                        <option>Select Unit</option>
                                        <option value="tons">Tons</option>
                                        <option value="quintal">Quintal</option>
                                        <option value="kg">KG</option>
                                        <option value="grams">Grams</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.RateFrom")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        name="ratefrom"
                                        value={values.ratefrom || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                    />
                                    {errors.ratefrom && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.ratefrom}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.Rateto")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        name="rateto"
                                        value={values.rateto || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                    />
                                    {errors.rateto && (
                                        <p className="text-red-500 text-sm mt-1">{errors.rateto}</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.CropVariety")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="cropvarietytitle"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none"
                                        value={cropvarietytitle}
                                        onChange={(e) => setCropvarietytitle(e.target.value)}
                                    >
                                        <option>Select Crop Variety </option>
                                        {cropvariety.map((element, index) => {
                                            return (
                                                <option key={index} value={`${element.id}`}>
                                                    {element.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.cropsvariety && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cropsvariety}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.CropSize1")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        name="cropssize"
                                        value={values.cropssize || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                    />
                                    {errors.cropssize && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cropssize}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.Category")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="carid"
                                        id="carid"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none"
                                        value={carid}
                                        onChange={handleCaridChange}
                                    >
                                        <option className="text-slate-400">Select Category </option>
                                        {Categorydata.map((element, index) => {
                                            return (
                                                <option key={index} value={`${element.cat_id}`}>
                                                    {element.category_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.ChipsPass")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="chipspassid"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none"
                                        value={chipspassid}
                                        onChange={(e) => setChipsPassId(e.target.value)}
                                    >
                                        <option >Select Chips Pass</option>
                                        {chipspassdata.map((element, index) => {
                                            return (
                                                <option key={index} value={`${element.id}`}>{element.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group mb-4">
                                    <label className="block text-sm font-semibold text-dark-700">
                                        {t("suppliesanddemandsfiled.OtherCropDetails")}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white
                                        outline-none"
                                        rows="5"
                                        name="cropdiscri"
                                        placeholder="Please provide any other details"
                                        value={values.cropdiscri || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        autoComplete="off"
                                    />
                                    {errors.cropdiscri && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cropdiscri}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {props.cropname === "Demand" ?
                                <></>
                                :
                                <>
                                    <div className="col-md-6">
                                        <label className="block text-sm font-semibold text-dark-700 mb-2">
                                            {t("suppliesanddemandsfiled.UploadVideo")}
                                        </label>
                                        <div
                                            className="text-xs"
                                            style={{
                                                border: "2px dashed #ccc",
                                                borderRadius: "5px",
                                                padding: "20px",
                                                textAlign: "center",
                                                cursor: "pointer",
                                                minHeight: "150px",
                                                width: "100%",
                                            }}
                                        >
                                            <input type="file" accept=".mp4,.mp3" id="imageUpload" onChange={(e) => { uploadImage(e) }} style={{ display: "none" }} />
                                            <label for="imageUpload" className="cursor-pointer">
                                                <div class="flex justify-center items-center cursor-pointer	text-lg mb-1">
                                                    <BsCameraVideoOff />
                                                </div>
                                                <span className="text-xs cursor-pointer">mp4 no larger than 10 MB.</span>
                                            </label>
                                        </div>
                                        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                                    </div>
                                    <div className="col-md-6">
                                        {getvideo === "" ? <></>
                                            :
                                            <div className="mt-3">
                                                <video width="320" height="240" controls>
                                                    <source src={getvideo} type="video/mp4" />
                                                </video>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <label className="block text-sm font-semibold text-dark-700 mb-2">
                                            {t("suppliesanddemandsfiled.Uploadimages")}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                if (cropphotolist.length || show_image.length + acceptedFiles.length > MAX_FILES) {
                                                    showToastMessage(
                                                        `You can only upload a maximum of ${MAX_FILES} images.`
                                                    );
                                                } else {
                                                    upload(acceptedFiles);
                                                }
                                            }}
                                            multiple
                                            maxFiles={MAX_FILES}
                                            maxSize={MAX_FILE_SIZE_MB * 1024 * 1024}
                                            accept={["image/jpeg", "image/png", "image/jpg"]} // Accept only JPEG and PNG images
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div
                                                    {...getRootProps()}
                                                    className="text-xs"
                                                    style={{
                                                        border: "2px dashed #ccc",
                                                        borderRadius: "5px",
                                                        padding: "20px",
                                                        textAlign: "center",
                                                        cursor: "pointer",
                                                        minHeight: "110px",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <input {...getInputProps()} />
                                                    <span className="org-about-imgupload-icon">
                                                    </span>
                                                    <div class="flex justify-center items-center cursor-pointer	text-lg mb-1">
                                                        <BsUpload />
                                                    </div>
                                                    <h5>Drag & drop or click to add image.</h5>
                                                    <p>JPEG, PNG, no larger than 1MB.</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </div>
                                    <div className="col-md-6">
                                        <Swiper
                                            navigation={true}
                                            modules={[Navigation]}
                                            className="mySwiper"
                                        >
                                            {show_image.map((element, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div className="images-show-box">
                                                            <img
                                                                src={element}
                                                                alt="Preview"
                                                                className=" h-[130px] w-[320px] mt-2"
                                                                multiple
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                </>}

                            <div className="row">
                                {cropphotolist.map((element) => {
                                    return (
                                        <div className="col-md-3">
                                            <div className="relative">
                                                <MdOutlineDelete
                                                    onClick={() => {
                                                        setShowDeletePoup(true);
                                                        setCropid(element.id);
                                                    }}
                                                    className="absolute right-0 cursor-pointer text-lg text-red-600" />
                                                <img
                                                    src={element.photo}
                                                    alt="Preview"
                                                    className="h-[100px] w-full mt-3 mb-3"
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
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
                                <button
                                    type="submit"
                                    className="w-32 bg-lime-950 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
                                >
                                    {t("suppliesanddemandsfiled.Submit")}
                                </button>
                            )}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                size="md"
                show={showdeletepoup}
                onHide={handleClose}
                centered="true"
            >
                <Modal.Header closeButton>
                    <h1>Delete supply Images</h1>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this Crop Images?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="bg-red-600" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete(cropid)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
