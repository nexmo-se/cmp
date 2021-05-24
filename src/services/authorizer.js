/**
 * Authorization Service
 * To check whether the user is having the role required, throw Forbidden 403 if user does not have the role
 */

export default (container) => {
  const authorize = allowedRoles => async (req, res, next) => {
    try {
      const { user } = req;
      if (user == null) {
        throw new container.AuthenticationError('Not authenticated');
      }

      const { id } = user;
      if (id == null || id === '') {
        throw new container.AuthenticationError('Invalid user');
      }

      const userRoles = user.roles;

      let hasRole = false;
      for (let i = 0; i < allowedRoles.length; i += 1) {
        const allowedRole = allowedRoles[i];
        for (let j = 0; j < userRoles.length; j += 1) {
          const userRole = userRoles[j].role;

          if (allowedRole === userRole) {
            hasRole = true;
            break;
          }
        }
      }

      if (!hasRole) {
        throw new container.ForbiddenError('User does not have Permission');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  return {
    authorize,
  };
};
