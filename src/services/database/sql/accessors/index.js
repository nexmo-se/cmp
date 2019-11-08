import User from './user';
import UserRole from './userrole';

export default container => ({
  User: User(container),
  UserRole: UserRole(container),
});
