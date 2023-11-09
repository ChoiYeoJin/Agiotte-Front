//TODO: header에 토큰정보 추가해야함

// http://kdt-sw-7-team02.elicecoding.com
const API_URL = "http://kdt-sw-7-team02.elicecoding.com:3000";
export const sendPost = async (url, objData) => {
  try {
    let headers = {};
    if (url === "/users/login") {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      };
    }

    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(objData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.error(response);
      console.log("실패");
    }
  } catch (error) {
    console.error(`${url} 오류발생 ${error}`);
  }
};

const createQueryString = (params) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

export const sendGet = async (url, queryData = "") => {
  try {
    let localUrl = `${API_URL}${url}`;

    if (queryData !== "") {
      localUrl += "/" + queryData;
    }

    const response = await fetch(localUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    console.log("response start");
    const data = await response.json();
    console.log("response end");
    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패" + data);
    }
  } catch (error) {
    console.error(`${url}/${queryData} 오류발생 ${error}`);
  }
};

export const sendPut = async (url, objData) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(objData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패");
    }
  } catch (error) {
    console.error(`${url} 오류발생 ${error}`);
  }
};

export const sendDelete = async (url, queryData) => {
  try {
    const response = await fetch(`${API_URL}${url}/${queryData}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(objData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("request 성공" + data);
      return data;
    } else {
      console.log("실패");
    }
  } catch (error) {
    console.error(`${url} 오류발생 ${error}`);
  }
};
