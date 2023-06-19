import React, { useState } from "react";

export function FormData() {
    const [isExit, setIsExit] = useState(-1);
    const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("studentData")) || []);
    const [student, setStudent] = useState({
        firstName: "",
        surName: "",
        age: "",
        phone: "",
        mail: "",
        pass: "",
        birthDate: "",
        fav: "",
        gender: "",
        chess: "",
        cricket: "",
        id: "",
    });
    const [duplicate, setDuplicate] = useState(
        JSON.parse(localStorage.getItem("data")) || []
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value, id: Date.now() });
    };
    const handleSubmit = () => {
        console.log("student", student);
        if (student.firstName === "") {
            window.alert("fill firstName")
        }
        if (student.surName === "") {
            window.alert("fill surname")
        }
        if (student.age === "") {
            window.alert("fill age")
        }
        if (student.phone === "") {
            window.alert("fill phone")
        }
        if (student.mail === "") {
            window.alert("fill mail")
        }
        if (student.pass === "") {
            window.alert("fill password")
        }
        if (student.birthDate === "") {
            window.alert("fill birthDate")
        }
        if (student.fav === "") {
            window.alert("fill fav")
        }
        if (student.gender === "") {
            window.alert("fill gender")
        }
        if (isExit !== -1) {
            const updateData = studentData.map((value, index) => {
                if (index === isExit) {
                    return student;
                }
                return value;
            });
            console.log("update", updateData);
            setStudentData(updateData);
            setIsExit(-1);
        }
        else {
            setStudentData([...studentData, student]);
        }
        localStorage.setItem("studentData", JSON.stringify([...studentData, student]));
        setStudent({ firstName: "", surName: "", age: "", phone: "", mail: "", pass: "", birthDate: "", fav: "", gender: "", cricket: "", chess: "" });
    };
    const handleDelete = (id) => {
        setStudentData([...studentData.filter((item) => item.id !== id)]);
        console.log("delete", studentData);
    };
    const handleEdit = (index) => {
        setIsExit(index);
        const editData = studentData.find((item, index1) => { return index1 === index });
        console.log("editData", editData);
        setStudent({
            firstName: editData.firstName,
            surName: editData.surName,
            age: editData.age,
            phone: editData.phone,
            mail: editData.mail,
            pass: editData.pass,
            birthDate: editData.birthDate,
            fav: editData.fav,
            gender: editData.gender,
            cricket: editData.cricket,
            chess: editData.chess,
        })
    };
    const handleSearch = (e) => {
        const value = e.target.value;

        if (!value) {
            setStudentData(duplicate);
            return;
        }

        const update = studentData.filter((item) => {
            return item.firstName?.toLowerCase().includes(value?.toLowerCase());
        });
        setStudentData(update);
    };
    const handleAllChange = (e, id) => {
        const { name, checked } = e.target;

        if (name === "select") {
            const allCheck = studentData.map((value) => {
                return {
                    ...value,
                    isChecked: checked,
                };
            });

            setStudentData(allCheck);
        }
        else {
            const updated = studentData.map((value) => {
                if (value.id === id) {
                    return {
                        ...value,
                        isChecked: checked,
                    };
                }

                return value;
            });
            setStudentData(updated);
        }
    };
    return (
        <>
            <div className="container bg-success p-5 text-white">
                <input type="text" id="firstName" name="firstName" placeholder="your firstName" onChange={(e) => handleChange(e)} value={student.firstName} /><br /><br />
                <input type="text" id="surName" name="surName" placeholder="your surName" onChange={(e) => handleChange(e)} value={student.surName} /><br /><br />
                <input type="number" id="age" name="age" placeholder="your age" onChange={(e) => handleChange(e)} value={student.age} /><br /><br />
                <input type="number" id="phone" name="phone" placeholder="your phone" onChange={(e) => handleChange(e)} value={student.phone} /><br /><br />
                <input type="email" id="mail" name="mail" placeholder="your email" onChange={(e) => handleChange(e)} value={student.mail} /><br /><br />
                <input type="password" id="pass" name="pass" placeholder="your password" onChange={(e) => handleChange(e)} value={student.pass} /><br /><br />
                <input type="date" id="birthDate" name="birthDate" placeholder="your birthDate" onChange={(e) => handleChange(e)} value={student.birthDate} /><br /><br />
                <input type="color" id="fav" name="fav" onChange={(e) => handleChange(e)} value={student.fav} /><br /><br />
                <label htmlFor="gender">gender:</label>
                <input type="radio" id="male" name="gender" value="male" onChange={(e) => handleChange(e)} checked={student.gender === "male"} />male
                <input type="radio" id="female" name="gender" value="female" onChange={(e) => handleChange(e)} checked={student.gender === "female"} />female<br /><br />
                <label htmlFor="hobby">hobby:</label>
                <input type="checkbox" id="cricket" name="cricket" value="cricket" onChange={(e) => handleChange(e)} checked={student.cricket} />cricket
                <input type="checkbox" id="chess" name="chess" value="chess" onChange={(e) => handleChange(e)} checked={student.chess} />chess<br /><br />
                <input type="submit" value="submit" onClick={() => handleSubmit()} /><br/><br/>
                <label htmlFor="search">Search record:</label>
                <input
                    type="text"
                    className="search"
                    onKeyUp={(e) => handleSearch(e)}
                ></input><br /><br />
            </div>

            <table className="container table table-border">
                <thead>
                    <th><input type="checkbox" name="select" checked={studentData.every((value) => value?.isChecked)} onChange={handleAllChange} /> </th>
                    <th>firstName</th>
                    <th>surname</th>
                    <th>age</th>
                    <th>phone</th>
                    <th>email</th>
                    <th>password</th>
                    <th>gender</th>
                    <th>hobby</th>
                    <th>delete</th>
                    <th>edit</th>
                </thead>
                <tbody>
                    {studentData.map((item, index) => {
                        return (
                            <tr>
                                <td><input type="checkbox" checked={item.isChecked} onChange={(e) => handleAllChange(e, item.id)} /> </td>
                                <td>{item.firstName}</td>
                                <td>{item.surName}</td>
                                <td>{item.age}</td>
                                <td>{item.phone}</td>
                                <td>{item.mail}</td>
                                <td>{item.pass}</td>
                                <td>{item.gender}</td>
                                <td>{item.cricket}{item.chess}</td>
                                <td><button type="button" onClick={() => handleDelete(item.id)}>delete</button></td>
                                <td><button type="button" onClick={() => handleEdit(index)}>edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}