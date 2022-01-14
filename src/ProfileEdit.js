import React, { useEffect, useState } from "react";

function ProfileEdit() {
    const [user, setUser] = useState({});

    const changeHandler = event => {
        setUser({ ...user, [event.target.name]: event.target.value })
      }

    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${user.id}`,
            {
                method: "PUT",
                body: JSON.stringify(user)
            }
        );
        const savedData = await response.json();
        console.log("Saved user!", savedData);
    };

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(response => response.json())
      .then(setUser);
    }, []); // Passing [] so that it only runs the effect once

    useEffect(() => {
        if (user.username) {
          document.title = `${user.username} : Edit Profile`;
        } else {
          document.title = "Edit Profile";
        }
      }, [user]
    );

    if (user.id) {
      // `user.id` is truthy after the API call returns
      return (
        <form name="profileEdit" onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">User Name:</label>
            <input
                id="username"
                name="wrongusername"
                type="text"
                required={true}
                value={user.username}
                onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="email"
                required={true}
                value={user.email}
                onChange={changeHandler}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      );
    }
    return "Loading...";
  }

  export default ProfileEdit;