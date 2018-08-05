module.exports = async function signup(req, res) {

  var name = req.param('name');
  try {
    await sails.getDatastore('cache').leaseConnection(function during(db, proceed) {
      db.get(name,async function (err, cachedData) {

        if (err) {
          sails.log.debug('Inside Error ' + err);
          return res.serverError(err);        }

        if (cachedData) {
          sails.log.debug('returning data from cache');
          return res.json(cachedData);
        }
        var newCachedUser = await UserData.find({
          name: "ramya"
        });

        sails.log.debug('cache data ' + name);
        db.set(name, newCachedUser, 'EX', 40);
        return res.send(newCachedUser);
      });

    });
  } catch (err) {
    sails.log.debug('Inside Error' + err.stack);
    return res.serverError(err);
  }
};