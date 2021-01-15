import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "semantic-ui-react";
import { BASE_URL } from "../../utils/Constants";
function SelectService({
  serviceDetails,
  choosedServiceDetails,
  setChoosedServiceDetails,
}) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("Default service");
  useEffect(async () => {
    await axios
      .get(`${BASE_URL}/defined-services/get-all`)
      .then((res) => {
        const options = [];
        res.data.forEach((element) => {
          options.push({
            key: element.serviceId,
            value: element.serviceName,
            text: element.serviceName,
          });
        });
        setServices(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    let data = [...serviceDetails];
    let filteredData = data.filter((item) => {
      return item.serviceName === selectedService;
    });

    setChoosedServiceDetails(filteredData[0]);
  }, [selectedService, serviceDetails]);
  const updateServiceDetails = (value) => {
    setSelectedService(value);
  };
  return (
    <div>
      <Form>
        <Form.Dropdown
          label="Service Name"
          placeholder="Service Name"
          options={services}
          value={selectedService}
          search
          selection
          width={3}
          onChange={(e, data) => updateServiceDetails(data.value)}
        />
      </Form>
    </div>
  );
}

export default SelectService;
