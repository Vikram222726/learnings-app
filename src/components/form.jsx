import React, {useState} from 'react';
import Select from 'react-select';
import axios from 'axios';

const Form = () =>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [interest,setInterest] = useState([]);
    const [errorName,setErrorName] = useState("");
    const [errorEmail,setErrorEmail] = useState("");
    const [errorInterest,setErrorInterest] = useState("");
    const [items,setItems] = useState([]);
    const [success,setSuccess] = useState("");
    const [details,setDetails] = useState("");
    let finalName,finalEmail,finalInterest;

    const finalPost = async () => {
        try{
            let result = await fetch('https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register',{
                method: 'post',
                // mode: 'no-cors',
                headers: {
                    'accept': 'success',
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-rapidapi-host': 'testpostapi1.p.rapidapi.com',
                    'x-rapidapi-key': '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7'
                },
                body: JSON.stringify({
                    'name': `${finalName}`,
                    'email': `${finalEmail}`,
                    'interests': `${finalInterest}`
                })
            });
            console.log(result);
        }catch(e){
            console.log(e);
        }
    }

    const postData = () =>{
        console.log("hey");
        setSuccess("Congrats! You are successfully Registered..");
        const newDetails = `Name:${name}  Email:${email}  Interests:${interest}`;
        setDetails(newDetails);
        finalName = name; finalEmail = email; finalInterest = interest;
        setName(""); setEmail(""); setInterest([]); setItems([]);
        finalPost();
    }

    const validate = () =>{
        let f=0,i=name.length,f1=-1,f2=-1;
        while(i--){
            if(name[i] >= '0' && name[i] <='9'){ f=1; break;}
            if(name[i] === '!' || name[i]==='@' || name[i]==='#' || name[i]==='$'){ f=1; break;}
        }
        i=email.length;
        while(i--){
            if(email[i] === '@'){ f1=i;}
            if(email[i] === '.'){ f2=i;}
        }
        if(name === ""){
            setErrorName("Please Enter your Name..");
            return;
        }else if(name.length === 1){
            setErrorName("There must be more than 1 character.."); return;
        }else if(f === 1){
            setErrorName("This Field only contains characters.."); return;
        }else{
            setErrorName("");
        }
        if(email === ""){
            setErrorEmail("Please Enter Your Email Id.."); return;
        }else if(email.length < 6 || f1 === -1 || f2 === -1 || (f1>f2)){
            setErrorEmail("Invalid Email.."); return;
        }else if(f1+1 === f2){
            setErrorEmail("There must be a char between @ and ."); return;
        }
        else{ setErrorEmail("");}
        if(interest.length === 0){
            setErrorInterest("Select Your Interests.."); return;
        }else{
            setErrorInterest("");
        }
        postData();
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSelect = (e) => {
        setInterest(Array.isArray(e) ? e.map(x => x.label) : []);
    }

    const getData = async (e) => {
        const newData = await axios.get(`https://webit-keyword-search.p.rapidapi.com/autosuggest?q=${e}&language=en&rapidapi-key=28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7`);
        const arr = newData.data.data.results;
        const num = newData.data.data.number;
        const newItems = [];
        for(let i=0;i<num;i++){
            newItems[i] = {label:arr[i], value:i+1};
        }
        if(newItems[0].label === undefined){
            setItems([]);
        }else{
            setItems(newItems);
        }
    }

    const handleChange = (e) => {
        if(e.length >= 2){
            getData(e);
        }
    }

    return(
        <>
            <div className="success">{success}</div>
            <form action="" className="form">
                <div>
                    <label htmlFor="username" className="labels">Name</label>
                    <div className="chkerr">{errorName}</div>
                    <div><input type="text" className="textbx" value={name} onChange={handleName} autoComplete="off" name="username" id="username" /></div>
                </div>
                <div>
                    <label htmlFor="email" className="labels">Email</label>
                    <div className="chkerr">{errorEmail}</div>
                    <div><input type="email" className="textbx" value={email} onChange={handleEmail} autoComplete="off" name="email" id="email" /></div>
                </div>
                <div>
                    <label htmlFor="interest" className="labels">Interests</label>
                    <div className="chkerr">{errorInterest}</div>
                    <Select isMulti className="textbx select" onInputChange={handleChange} onChange={handleSelect} placeholder="select almost 3 items.." options={items} />
                </div>
                <div>
                    <button type="button" onClick={validate} className="btn btn-primary button">Register</button>
                </div>
            </form>
            <div className="details">{details}</div>
        </>
    )
}

export default Form;