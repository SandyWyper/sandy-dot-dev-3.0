---
posttype: "projects"
date: "2020-05-04"
title: "MERN Stack Lists App"
description: "MongoDB Atlas database, with CRUD actions handled by a Node.js back-end, using Express and Mongoose.  Client side code is built up from create-react-app, react-strap components and all glued together with Redux.  This web-app uses Json Web Token and bcrypt.js for user login and authentication, so you can write, edit and read your lists from anywhere."
category: "Side Project"
cover: "./shopping-list-mobile-view-leafy-bg-crop.jpg"
coverAlt: "The list app see on a phone"
tags:
  - "JavaScript"
  - "React"
  - "Heroku"
  - "Node"
  - "Redux"
  - "Express"
  - "Mongoose"
  - "MongoDB"
  - "JWT"
repository: "https://github.com/SandyWyper/mern-shopping-list"
live: "https://safe-tor-04832.herokuapp.com/"
---

First project for me with a lot of the pieces of this puzzle. MongoDB Atlas database, with CRUD actions handled by a Node.JS back-end, using Express and Mongoose. Client side code is built up from create-react-app, react-strap components and all glued together with Redux.

This web-app uses Json Web Token and bcrypt.js for user login and authentication, so you can write, edit and read your lists from anywhere.

### Goals

- Build a MERN stack application that sends and receives database entries.
- Users should be able to securely login.
- Users can create and edit lists.
- Handle state and actions with Redux.

## ![mern list demo](shopping-list-demo.gif)

### MERN Stack

MERN is the acronym for MongoDB, Express JS, React JS and Node JS. The MERN stack is a combination of the above technologies, all based on JavaScript, used to build advanced web applications. It is an open source full stack development framework i.e. it provides entire front-end to back-end development components. It's the next step for JavaScript based front-end developers who are looking to expand their horizons.

At first I didn't see the reason for having the CRUD actions (_Create, Read, Update and Remove_) on the server, as a kind of middleman between the user and the database. However after building this, I see that it not only secures data sent to and from the database, but it also parses the data, and thus taking some of the computational load away from the user.

## ![mern-stack](mern.jpg)

### Mongoose

> Mongoose is an Object Data Modelling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

The beauty of MongDB is that it stores it's data in an object, which is key to JavaScript so makes perfect sense to me. Below is the _user-model_ that is used every time you want to create a new user. The information is sent to the sever from the user, parsed using the _Schema()_ method provided by mongoose, then sent to MongoDB Atlas.

```javascript
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registered_date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model("user", UserSchema)
```

### Redux

Redux uses the principles of functional programming as it's backbone; It's able to treat functions as first-class objects, It's able to pass functions as arguments, It's able to use pure, recursive, higher-order, closure and anonymous functions... etc.
Also the state doesn’t change (i.e. it’s immutable).

In practice, this means that to use Redux, you can't help but write clean code that strives towards the [single&nbsp;responsibility&nbsp;principle](https://en.wikipedia.org/wiki/Single-responsibility_principle). At first it seemed confusing, but actually it really helps to keep everything ordered and lets you build up the application piece by piece.

Simply put, you have 3 parts **Actions**, **Reducers** and **Store**.

The **Store** holds your state but unlike traditional React components the state is not bound to the scope of each component. Instead, the state is kind of _global_ (which seems counter intuitive) and is mapped into the components _props_. The catch is that you cannot change the state from these components directly. That's where **Actions** come in.

**Actions** are functions that are exported and stored in the Redux **Store**. These can then be used by our components once the **Store** has been mapped to the component's props.

Take this **Action** function.

```javascript
export const getLists = userID => (dispatch, getState) => {
  dispatch(setListsLoading())

  axios
    .get(`/api/lists/${userID}`, tokenConfig(getState))
    .then(res => {
      res.data.length > 0
        ? dispatch({
            type: LISTS_LOADED,
            payload: res.data,
          })
        : dispatch({
            type: LISTS_EMPTY,
          })
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}
```

This could then be called in the component like `props.getLists()`. You see at the top of this function setListsLoading() is passed to the dispatch() method? Every **Action** gets dispatched to the **Reducer**.

Whenever an **Action** is dispatched to the **Reducer**, it carries with it a 'type'. These types are defined yourself and tell the reducers how you should be updating the state. When I say update, I of course mean copy and then replace the state with a new version. Here's the authentication reducer...

```javascript
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }
    default:
      return state
  }
}
```

These changes in state will then ripple through the application and update only the parts that use the state to render.

### Conclusions

It's ugly as sin, and I wont be using [React-Strap](https://reactstrap.github.io/) again in a hurry. However, it served it's purpose for this exercise. Redux is really fascinating. On one hand, it seems daft to keep all your state in one place, but on the other it keeps your programmatic order of executed functions and how they change the state across you application exceptionally clear. Also, it tends toward a more prescribed architecture and so is perhaps easier for teams to dive in and work on the one code base. Perhaps React Hooks and [Context](https://reactjs.org/docs/context.html) has reduced the need for Redux, however anyone who sticks with Redux shouldn't be considered a stick in the mud.
