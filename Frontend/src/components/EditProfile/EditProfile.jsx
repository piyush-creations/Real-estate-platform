import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";
import dp from "../../Assets/images/dp.jpg";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    occupation: "",
    profilePicture: "",
  });

  // ✅ Fetch User Data from API when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/profile", {
          withCredentials: true, // Include cookies if required
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle Profile Picture Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Form Submit (Send Data to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8800/api/profile",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure cookies are sent
        }
      );
  
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };;

  // ✅ Trigger File Input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-picture-upload">
          <div
            className="profile-preview"
            style={{ backgroundImage: `url(${formData.profilePicture || dp})` }}
            onClick={triggerFileInput}
          >
            {!formData.profilePicture && <span>Click to upload</span>}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required  />
        </div>

        <div className="form-group">
          <label>Contact:</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Occupation:</label>
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate("/dashboard")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
