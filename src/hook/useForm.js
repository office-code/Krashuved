import { useState, useEffect } from "react";
import { omit } from "lodash";
const useForm = (callback) => {
    //Form values
    const [values, setValues] = useState({});
    const [isFormReset, setIsFormReset] = useState(false);
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({});
    const [formname, setformname] = useState("");
    const resetForm = () => {
        setValues({});
        setErrors({});
        setIsFormReset(true);
    };

    const validate = (event, name, value) => {
        const trimmedValue = typeof value === 'string' ? value.trim() : value;
        //A function to validate each input values
        switch (name) {
            case "email":
                // if (value.trim().length <= 0) {
                //     setErrors({
                //         ...errors,
                //         email: "Please Enter Your Email Address",
                //     });
                // } else 
                
                if (
                    !new RegExp(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: "Enter a valid email address",
                    });
                } else {
                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                }
                break;


            case "fname":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        fname: "Please Enter Your First Name",
                    });
                } else if (!new RegExp(/^[A-Za-z\s]+$/).test(value)) {
                    setErrors({
                        ...errors,
                        fname: "Enter only alphabet",
                    });
                } else {
                    let newObj = omit(errors, "fname");
                    setErrors(newObj);
                }
                break;
            case "lname":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        lname: 'Please Enter Your Last Name',
                    });
                } else if (!new RegExp(/^[A-Za-z\s]+$/).test(value)) {
                    setErrors({
                        ...errors,
                        lname: 'Only Enter Alphabet',
                    });
                } else {
                    let newObj = omit(errors, "lname");
                    setErrors(newObj);
                }
                break;

            case "village":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        village: "Please Enter Your village Name",
                    });
                } else if (!new RegExp(/^[A-Za-z\s]+$/).test(value)) {
                    setErrors({
                        ...errors,
                        village: "Enter only alphabet",
                    });
                } else {
                    let newObj = omit(errors, "village");
                    setErrors(newObj);
                }
                break;

            case "pincode":
                // if (value.trim().length <= 0) {
                //     setErrors({
                //         ...errors,
                //         pincode: "Field is required",
                //     });
                // }
                // else
                
                if (!/^\d{6}$/.test(value)) {
                    setErrors({
                        ...errors,
                        pincode: 'Pincode must be a 6-digit number',
                    });
                }
                else {
                    let newObj = omit(errors, "pincode");
                    setErrors(newObj);
                }
                break;

            case "quantity":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        quantity: 'Quantity is required.',
                    });
                }
                else if (value < 1 || value > 1000) {
                    setErrors({
                        ...errors,
                        quantity: 'Quantity must be between 1 and 1000.',
                    });
                }
                else {
                    let newObj = omit(errors, "quantity");
                    setErrors(newObj);
                }
                break;

            case "password":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        password: "Password required ",
                    });
                }
                else if (value.length < 6) {
                    setErrors({
                        ...errors,
                        password: "password must be at least 6 characters.",
                    });
                } else {
                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                    setPassword(value);
                }
                break;


            case "password1":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        password1: "Password required ",
                    });
                }
                else {
                    let newObj = omit(errors, "password1");
                    setErrors(newObj);
                    setPassword(value);
                }
                break;





            case "confirmpassword":
                if (value.length < 6) {
                    setErrors({
                        ...errors,
                        confirmpassword: "password must be at least 6 characters",
                    });
                } else if (value !== values.password) {
                    setErrors({
                        ...errors,
                        confirmpassword: "Passwords do not match",
                    });
                } else {
                    let newObj = omit(errors, "confirmpassword");
                    setErrors(newObj);
                }
                break;


            case "cropname":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        cropname: "Please Enter Your Crop Name",
                    });
                } else {
                    let newObj = omit(errors, "cropname");
                    setErrors(newObj);
                }
                break;

            case "cropdiscri":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        cropdiscri: "Please Enter Your Crops Description",
                    });
                }
                else {
                    let newObj = omit(errors, "cropdiscri");
                    setErrors(newObj);
                }
                break;


            case "quantity":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        quantity: 'Quantity is required.',
                    });
                }
                else if (value < 1 || value > 500000) {
                    setErrors({
                        ...errors,
                        quantity: 'Quantity must be between 1 and 500,000.',
                    });
                }
                else {
                    let newObj = omit(errors, "quantity");
                    setErrors(newObj);
                }
                break;

            case "cropsvariety":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        cropsvariety: "Please Enter Your Crop Variety",
                    });
                } else {
                    let newObj = omit(errors, "cropsvariety");
                    setErrors(newObj);
                }
                break;

            case "cropssize":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        cropssize: "Field is required",
                    });
                }
                else if (!new RegExp(/^\d+$/).test(value)) {
                    setErrors({
                        ...errors,
                        cropssize: 'Please enter a positive number.',
                    });
                }
                else {
                    let newObj = omit(errors, "cropssize");
                    setErrors(newObj);
                }
                break;



            //   case "answer":
            //     if (value.trim().length <= 0) {
            //       setErrors({
            //         ...errors,
            //         answer: "Field is required",
            //       });
            //     }
            //     else {
            //       let newObj = omit(errors, "answer");
            //       setErrors(newObj);
            //     }
            //     break;
            //   case "question":
            //     if (value.trim().length <= 0) {
            //       setErrors({
            //         ...errors,
            //         question: "Field is required",

            //       });
            //     }
            //     else {
            //       let newObj = omit(errors, "question");
            //       setErrors(newObj);
            //     }
            //     break;
            case "otpcode":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        otpcode: "Field is required",
                    });
                }
                else {
                    let newObj = omit(errors, "otpcode");
                    setErrors(newObj);
                }
                break;

            case "ratefrom":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        ratefrom: "Field is required",
                    });
                } else if (value < 1) {
                    setErrors({
                        ...errors,
                        ratefrom: 'Please enter a positive number',
                    });
                }
                else {
                    let newObj = omit(errors, "ratefrom");
                    setErrors(newObj);
                }
                break;

            case "rateto":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        rateto: "Field is required",
                    });
                } else if (value < 1 ) {
                    setErrors({
                        ...errors,
                        rateto: 'Please enter a positive number',
                    });
                }
                else {
                    let newObj = omit(errors, "rateto");
                    setErrors(newObj);
                }
                break;

            case "contactmessage":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        contactmessage: "Please Enter Your Message",
                    });
                } else {
                    let newObj = omit(errors, "contactmessage");
                    setErrors(newObj);
                }
                break;


            case "userremarks":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        userremarks: "Please Enter Your Message",
                    });
                } else {
                    let newObj = omit(errors, "userremarks");
                    setErrors(newObj);
                }
                break;


            case "userrate":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        userrate: "Field is required",
                    });
                }
                else if (value < 1 ) {
                    setErrors({
                        ...errors,
                        userrate: 'Please enter a positive number',
                    });
                }
                else {
                    let newObj = omit(errors, "userrate");
                    setErrors(newObj);
                }
                break;
            case "soldat":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        soldat: "Field is required",
                    });
                }else if (value < 1 ) {
                    setErrors({
                        ...errors,
                        soldat: 'Please enter a positive number',
                    });
                }
                else {
                    let newObj = omit(errors, "soldat");
                    setErrors(newObj);
                }
                break;



            case "subject":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        subject: "Field is required",
                    });
                }
                else {
                    let newObj = omit(errors, "subject");
                    setErrors(newObj);
                }
                break;

            case "contactname":
                if (value.trim().length <= 0) {
                    setErrors({
                        ...errors,
                        contactname: "Please Enter Your Name",
                    });
                } else if (!new RegExp(/^[A-Za-z\s]+$/).test(value)) {
                    setErrors({
                        ...errors,
                        contactname: "Enter only alphabet",
                    });
                } else {
                    let newObj = omit(errors, "contactname");
                    setErrors(newObj);
                }
                break;


            default:
                break;
        }
    };


    const handleChange = (event) => {

        //To stop default events
        event.persist();

        let name = event.target.name;
        const val = event.target.type === 'checkbox' ? event.target.checked : event.target.type === 'file' ? event.target.files[0] : event.target.value;


        if (event.target.required === true) {
            validate(event, name, val);
        } // Handle checkbox and radio button separately 
        else if (event.target.type === "checkbox" || event.target.type === "radio") {

            validate(event, name, val);
            setValues({
                ...values,
                [name]: val,
            });
        }
        else if (event.target.type === 'file') {
            validate(event, name, val);
            setValues({
                ...values,
                [name]: val,
            });
        }
        else {
            console.error("inside");
            let newObj = omit(errors, name);
            setErrors(newObj);
        }
        //Let's set these values in state
        setValues({
            ...values,
            [name]: val,
            [name + 'event']: event,
            event: event
        });

        //Update form values
        setValues({
            ...values,
            [name]: val,
        });

        // Trigger validation for confirm password whenever new password changes
        if (name === "password") {
            validateConfirmPassword(val, values.confirmpassword);
        }
    };



    const validateConfirmPassword = (newPassword, confirmPassword) => {
        if (confirmPassword && newPassword !== confirmPassword) {
            setErrors({
                ...errors,
                confirmpassword: "Passwords do not match",
            });
        } else {
            let newObj = omit(errors, "confirmpassword");
            setErrors(newObj);
        }
    };








    const handleBlur = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        if (event.target.required === true) {
            validate(event, name, val);
        }  // Handle checkbox and radio button separately 
        else if (event.target.type === "checkbox" || event.target.type === "radio") {
            validate(event, name, val);
            setValues({
                ...values,
                [name]: val,
            });
        }
        else {
            let newObj = omit(errors, name);
            setErrors(newObj);
        }

        //Let's set these values in state
        setValues({
            ...values,
            [name]: val,
            [name + 'event']: event,
            event: event
        });
    };


    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // Prevent default form submission

        setformname(event.target.name);
        if (callback) {
            callback(); // Invoke the provided callback function for form submission logic
        }
    };


    useEffect(() => {
        if (isFormReset) {
            setValues({});
            setErrors({});
            setIsFormReset(false);
        }
    }, [isFormReset]);

    return {
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        values,
        errors,
        setValues,
        setErrors,
    };
};

export default useForm;




