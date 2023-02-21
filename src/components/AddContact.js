import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Modal } from "react-bootstrap";
import AlertScript from "./AlertScript";

 
const AddContact = (props) => {

    //for form
    const [fullName , setFullName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [officeNumber, setOfficeNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [groupId, setGroupId] = useState("");
    const [secondMobileNumber, setSecondMobileNumber] = useState("");

    const [group, setGroup] = useState([]);
    
    //for validation
    const [validated, setValidated] = useState(false);

    const {show, onHide} = props;

    useEffect(() =>{
        getGroup()
    })

    const getGroup = () =>{
        const url = "http://localhost/contact/users.php";
        const userId = sessionStorage.getItem("userId");
        const jsonData = {
            userId: userId
        }

        const formData = new FormData();

        formData.append("operation", "getGroup");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url: url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                setGroup(res.data);
            }
        })

        .catch((err)=>{
            getAlert("danger", "Error occured: " + err);
        })
        
    }

    //for alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}

    const addContact = () =>{
        const userId = sessionStorage.getItem("userId");
        const url = "http://localhost/contact/users.php";

        const jsonData = {
            fullName: fullName,
            mobileNumber: mobileNumber,
            officeNumber: officeNumber,
            address: address,
            email: email,
            groupId: groupId,
            userId: userId,
            mobileNumber2: secondMobileNumber
        }

        const formData = new FormData();

        formData.append("operation", "addContact");
        formData.append("json", JSON.stringify(jsonData));

        axios({
            url:url,
            data: formData,
            method: "post"
        })

        .then((res) =>{
            if(res.data !== 0){
                getAlert("success","Success!");
                setTimeout(() => {handleOnHide()}, 2000);
            }
        })

        .catch((err)=>{
            getAlert("danger", "Error occured: " + err);
        })
        
    }

    const formValidation = (e) =>{
        const form = e.currentTarget;

        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            addContact();
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
    }

    const handleOnHide = () =>{
        setValidated(false);
        setShowAlert(false);
        setFullName("");
        setMobileNumber("");
        setOfficeNumber("");
        setAddress("");
        setEmail("");
        setGroupId("");
        setSecondMobileNumber("");
        onHide();
    }

    const handleGroupId = (id) =>{
        setGroupId(id);
    }
    
    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header>
                    <h3 className="mt-4 text-black">Add Contact</h3>  
                </Modal.Header>
                <Modal.Body>        
       
                    <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
                    <Form noValidate validated={validated} className="fatter-text text-center text-black" onSubmit={formValidation}>
                        <Form.Group>
                            <FloatingLabel label="Full Name">
                                <Form.Control
                                    type='text'
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This field is required    
                                </Form.Control.Feedback> 
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mt-2 mb-3">
                            <FloatingLabel label="Mobile Number">
                                <Form.Control
                                    type='text'
                                    placeholder="Mobile Number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    This field is required    
                                </Form.Control.Feedback> 
                            </FloatingLabel>

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Office number(Optional)">
                                <Form.Control
                                    type='text'
                                    placeholder="Office Number(Optional)"
                                    value={officeNumber}
                                    onChange={(e) => setOfficeNumber(e.target.value)}
                                />
                            </FloatingLabel>

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Address(Optional)">
                                <Form.Control
                                    type='text'
                                    placeholder="Address(Optional)"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </FloatingLabel>

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="Email(Optional)">
                                <Form.Control
                                    type='text'
                                    placeholder="Email(Optional)"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FloatingLabel>

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FloatingLabel label="2nd Mobile Number(Optional)">
                                <Form.Control
                                    type='text'
                                    placeholder="2nd Mobile Number(Optional)"
                                    value={secondMobileNumber}
                                    onChange={(e) => setSecondMobileNumber(e.target.value)}
                                />
                            </FloatingLabel>

                        </Form.Group>

                        <Form.Select aria-label="Default select example">
                            <option>Select group(optional)</option>
                            
                            {group.map((groups, index) => (
                                <option value={groups.grp_id} key={index} onClick={() => handleGroupId(groups.grp_id)}>{groups.grp_name}</option>
                            ))}

                        </Form.Select>
                        <hr />
                        <Container className="text-end">
                            <Button className="btn-danger" onClick={handleOnHide} style={{marginRight: "5px"}}>Close</Button>
                            <Button type="submit" className="btn-success">Submit</Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
 
export default AddContact;