const UserActions = require("../src/mongo/dbActions/User");
const setup = require("../src/mongo/setupdb");
const UserExistsError = require("../errors/UserExistsError");
const chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

let m;
before(async function() {
  m = await setup(true);
});
describe("UserActions", function() {
  describe("createUser()", function() {
    it("Returns true if a user is successfully added", async function() {
      const newUser = await UserActions.createUser("Test", "Test");
      expect(newUser).to.equal(true);
    });
  });
});
after(async function() {
  m.mongoose.connection.db.dropDatabase();
  m.db.close();
});
