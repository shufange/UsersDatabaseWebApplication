/**
 * Created by shufange on 15/1/19.
 */
function Users() {

}

//get full list of user table
Users.prototype.getUserList = function(req, done) {
    var id = typeof req.query.id !== 'undefined' && req.query.id !== '' ? req.query.id : null;

    var query = "Select * from test.shufan_user";
    var whereclause = " where ID = " + id;
    if(id!=null) query += whereclause;

    //console.log(query);
    this.query(req, query, done);
};

//delete user by id
Users.prototype.deleteUserByID = function(req, done) {
    var user_id = typeof req.body.userid !== 'undefined' && req.body.userid !== '' ? req.body.userid : null;
    //console.log('user_id is: ' + user_id);
    var query = "Delete from test.shufan_user where ID = " + user_id;
    this.query(req, query, done);
};

//Create new user
Users.prototype.createUser = function(req, done){
    var newuser = typeof req.body.newuser !== 'undefined' && req.body.newuser !== '' ? req.body.newuser : null;

    var newuser_id = newuser != null ? newuser.ID : '';
    var newuser_fname = newuser != null ? newuser.FIRST_NAME : '';
    var newuser_lname = newuser != null ? newuser.LAST_NAME : '';
    var newuser_sex = newuser != null ? newuser.SEX : 'M';
    var newuser_age = newuser != null ? newuser.AGE : '';

    var sq = "'";  var cm = ",";
    var query = "INSERT INTO test.shufan_user VALUE" + "(" + sq+newuser_id+sq + cm + sq+newuser_fname+sq + cm + sq+newuser_lname+sq +
        cm + sq+newuser_sex+sq + cm + sq+newuser_age+sq + ")";
    //console.log(' query is: ' + query);
    this.query(req, query, done);
}

//Edit/Update user info
Users.prototype.editUser = function(req, done) {

    var edituser = typeof req.body.edituser !== 'undefined' && req.body.edituser !== '' ? req.body.edituser : null;
    //console.log(edituser);
    if(edituser==null) return;
    var fields =[];
    fields[0] = typeof edituser.ID !== 'undefined' ? edituser.ID : '';
    fields[1] = typeof edituser.FIRST_NAME !== 'undefined'? edituser.FIRST_NAME : '';
    fields[2] = typeof edituser.LAST_NAME !== 'undefined'? edituser.LAST_NAME : '';
    fields[3] = typeof edituser.SEX !== 'undefined'? edituser.SEX : 'M';
    fields[4] = typeof edituser.AGE !== 'undefined'? edituser.AGE : '';

    var qstring = [];

        if(fields[1] != '') qstring.splice(0,0,  "FIRST_NAME = " + "'" + fields[1] + "'");
        if(fields[2] != '') qstring.splice(0,0, "LAST_NAME = " + "'" + fields[2] + "'");
        if(fields[3] != '') qstring.splice(0,0, "SEX = " + "'" + fields[3] + "'");
        if(fields[4] != '')qstring.splice(0,0, "AGE = " + "'" + fields[4] + "'");

        //build query string
        var query = "UPDATE test.shufan_user SET ";

        for(var i = 0;i<qstring.length;i++){
            query+=qstring[i]+ (i==qstring.length-1? "":",");

        }
        query += " WHERE ID = " + fields[0];
        //console.log("query:" + query);
        this.query(req, query, done);

}


Users.prototype.query = function(req, query, done) {

    req.getConnection(function(err, connection) {

        if (err) {
            done({err: true, msg: 'database connect error'});
        }

        connection.query(query, function(error, result, fields) {

            //console.log(result[0][0].return_code);
            if (error ) {
                done([]);
            } else {
                //console.log(result[1]);
                done(result);
            }

        });

    });
};

module.exports = new Users();
