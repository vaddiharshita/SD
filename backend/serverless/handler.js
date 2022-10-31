'use strict';



///
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "database-1.cufkzfwhztsx.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "crm"
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const jwt = require("jsonwebtoken");
module.exports.middleware = async (event, context) => {
  console.log("middleware");
  let token = event.headers.token;
  let verified = await new Promise((resolve, reject) => {
    jwt.verify(event.headers.token, "secretkey", (err, decoded) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
  if (!verified) {
    context.end();
    return { statusCode: 403, body: "Authentication Failed!" };
  }
};
////jest login
module.exports.Login = async (event) => {
  //let request = JSON.parse(event.body);
  let req = event.body;
  let username = req.username;
  let password = req.password;
  let sql =
    "SELECT txtEmail,txtPassword FROM tblusers where txtEmail='" + username + "' and txtPassword='" + password + "';";
  let result = await new Promise((resolve, reject) => {
    if (username == "") {
      resolve({ body: JSON.stringify({ status: "error", Message: "username missing" }) })
      return
    }
    if (password == "") {
      resolve({ body: JSON.stringify({ status: "error", Message: "password missing" }) })
      return
    }
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      if (result != "") {
        reject("username or password is incorrect");
      } else {
        const token = jwt.sign(
          { username: username, password: password }, "secretkey");
        resolve({ body: "Success: " + JSON.stringify(token) });
      }
    });
  });
  return result;
};


module.exports.getTODO = async (event) => {
  let request = JSON.parse(event.body)
  //let progress = request.progress
  let sql = "select tblactivity.txtDescription,  tblleads.id,tblleads.txtFirstName,tblcampaign.txtCampaignName,tblactivitytype.txtActivitytype,tblprogresstype.txtProgresstype from tblactivity join tblprogresstype on tblactivity.refProgressStatus = tblprogresstype.id join tblactivitytype on tblactivitytype.id = tblactivity.refActivitytype join tblleadcampaignmap on tblactivity.refMapid = tblleadcampaignmap.id join tblcampaign on tblcampaign.id = tblleadcampaignmap.refCampaignId join tblleads on tblleads.id = tblleadcampaignmap.refLeadId";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err
      console.log(JSON.stringify(result))
      if (result!= ""){
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    }
    });
  });
  return result;
}
