import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AddressInput.css";

function AddressInput(props) {
  const { addInvoicePageVisible } = useSelector(
    (store) => store.addEditInvoicePage
  );
  const [address, setAddress] = useState(props.addressObj);

  function handleInputChange(event) {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    props.getAddress(address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (!addInvoicePageVisible) {
      setAddress(props.addressObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInvoicePageVisible]);

  return (
    <div className="address-input">
      <label>
        Street Address
        <input
          type="text"
          name="street"
          maxLength={30}
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
            maxLength={30}
            value={address.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Post Code
          <input
            type="text"
            name="postCode"
            maxLength={30}
            value={address.postCode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            maxLength={30}
            value={address.country}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </div>
  );
}

export default AddressInput;
