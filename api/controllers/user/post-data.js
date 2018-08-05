module.exports = async function signup(req, res) {
  var createdRecord = await UserData.create({
    name: "ramya"
  }).fetch();
  sails.log.debug('TODO: implement' + createdRecord.name);
  return res.send("hello world");

};
