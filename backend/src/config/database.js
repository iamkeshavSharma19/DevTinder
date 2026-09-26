import mongoose from "mongoose";

//&connecting to the mongodb cluster.But this is not the good way,a good way is to wrap this inside an async function,because mongoose.connect() returns you a promise.It also tells you that connection was successfully established or it was not successfully established.

//&Async function always returns the promise object no matter what you return,it will wrap your returned value inside the result of the returned promise object.

//~In the mongoDB connection string after net/,if you add the name of your database i.e helloWorld,then it will connect to the specific database i.e helloWorld.If you do'not write the name of your database then it is referring and conencting with the cluster.

//?In the cluster,there can be multiple databases.But we will create a new database devTinder,at last in the connection string write devTinder.devTinder will be the new database which will be created inside that cluster.

export const connectDB = async () => {
  try {
    //console.log("async code");
    const promiseResult = await mongoose.connect(process.env.MONGODB_URI);

    // console.log(promiseResult);

    return promiseResult;
  } catch (error) {
    console.log(error);
  }
};



