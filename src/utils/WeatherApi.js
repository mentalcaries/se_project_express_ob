import * as Constants from "../utils/constants";
import { checkResponse } from "./api";
const fetchApiInfo = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${Constants.longitude}&lon=${Constants.latitude}&units=imperial&appid=c35029a909644511423a38bc732f0bc2`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return checkResponse(response)
    })
    .then((data) => {
      return data;
    });
};

export default fetchApiInfo;
