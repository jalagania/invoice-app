import { useState } from "react";
import "./AddressInput.css";

function AddressInput(props) {
  const addressObj = {
    street: "",
    city: "",
    postCode: "",
    country: "",
  };

  function handleInputChange(event) {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  }

  const [address, setAddress] = useState(addressObj);

  return (
    <div className="address-input">
      <label>
        Street Address
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleInputChange}
        />
      </label>
      <div className="input-grid-box">
        <label>
          City
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Post Code
          <input
            type="text"
            name="postCode"
            value={address.postCode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </div>
  );
}

export default AddressInput;
