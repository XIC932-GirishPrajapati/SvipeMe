/** @format */

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
import axios from 'axios';

const LINK = 'https://wise-termite-35.loca.lt'
export const signup = (
  firstName,
  secondName,
  emailorphone,
  password,
  confirmpassword,
  candidate,
) => {
  return async dispatch => {
    // console.log(getState());
    console.log(
      firstName,
      secondName,
      emailorphone,
      password,
      confirmpassword,
      candidate,
    );
    try {
      if (password !== confirmpassword)
        throw new Error('passwords are different');

      const data = {
        firstName: firstName,
        secondName: secondName,
        emailormobile: emailorphone,
        password: password,
      };
      console.log(data);
      let url = `${LINK}/api/user/signup`;
      if (!candidate) {
        url = `${LINK}/api/recruiter/signup`;
      }
      const headers = {
        'Content-Type': 'application/json',
      };

      // axios
      //   .post(url, data)
      //   .then(res => {
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResData = await response.json();
        // console.error(errorResData.message);
        throw new Error(errorResData.message);
      }

      const resData = await response.json();
      // console.log(resData.token);
      dispatch({
        type: SIGNUP,
        userData: {
          userId: resData.userId,
          token: resData.token,
        },
      });
    } catch (err) {
      console.log(err.message, '********');
      throw err.message;
    }
  };
};

export const login = (emailorphone, password, candidate) => {
  return async dispatch => {
    console.log(emailorphone, password, candidate, '*');
    try {
      const data = {
        emailormobile: emailorphone,
        password: password,
      };

      let url = `${LINK}/api/user/login`;
      if (!candidate) {
        url = `${LINK}/api/recruiter/login`;
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResData = await response.json();
        // console.error(errorResData.message);
        throw new Error(errorResData.message);
      }

      const resData = await response.json();
      console.log(resData);
      dispatch({
        type: SIGNUP,
        userData: {
          userId: resData.userId,
          token: resData.token,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw err.message;
    }
  };
};
export const authWithSSO = (
  firstName,
  secondName,
  email,
  password,
  candidate,
) => {
  return async dispatch => {
    console.log(firstName, secondName, email, password, candidate);
    const db = {email};

    let checkUrl = `${LINK}/api/user/ispresent`;
    if (!candidate) {
      checkUrl = `${LINK}/api/recruiter/ispresent`;
    }

    try {
      const response = await axios.post(checkUrl, db);
      const ispresent = response.data.existingUser;
      console.log(response.data);
      if (ispresent) {
        let url = `${LINK}/api/user/login`;
        if (!candidate) {
          url = `${LINK}/api/recruiter/login`;
        }
        const data = {
          emailormobile: email,
          password: password,
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorResData = await response.json();
          console.error(errorResData.message);
          throw new Error(errorResData.message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({
          type: SIGNUP,
          userData: {
            userId: resData.userId,
            token: resData.token,
          },
        });
      } else {
        const data = {
          firstName: firstName,
          secondName: secondName,
          emailormobile: email,
          password: password,
        };
        console.log(data);
        let url = `${LINK}/api/user/signup`;
        if (!candidate) {
          url = `${LINK}/api/recruiter/signup`;
        }
        const headers = {
          'Content-Type': 'application/json',
        };

        // axios
        //   .post(url, data)
        //   .then(res => {
        //     console.log(res.data);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorResData = await response.json();
          console.error(errorResData.message);
          throw new Error(errorResData.message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({
          type: SIGNUP,
          userData: {
            userId: resData.userId,
            token: resData.token,
          },
        });
      }
    } catch (err) {
      console.log(err.message);
      throw err.message;
    }
  };
};
