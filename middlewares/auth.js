const admin = require ('../firebase.js');

  
  
  module.exports  = (req, res, next) => {

    return admin
    .auth()
    .getUser(req.headers.uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      req.uid = userRecord.uid
      req.displayName = userRecord.displayName 
    //   console.log(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
    //   res.send(`Successfully fetched user data: ${userRecord.toJSON()}`)
      return next();
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
      res.status(401).send('Error fetching user data: '+error+". You might have missed the 'uid' header")
    });

  };
  
  