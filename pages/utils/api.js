//TODO: header에 토큰정보 추가해야함
export const sendPost = async (url, objData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
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

const createQueryString = (params) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

export const sendGet = async (url, queryData) => {
  try {
    //const queryString = createQueryString(objData);
    const response = await fetch(`${url}/${queryData}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
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

export const sendPut = async (url, objData) => {
  try {
    const response = await fetch(url, {
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

export const sendDelete = async (url) => {
  try {
    const response = await fetch(url, {
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
