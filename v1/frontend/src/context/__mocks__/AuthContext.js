// v1/frontend/src/context/__mocks__/AuthContext.js
export const fetchUserMock = jest.fn();
export const logoutMock = jest.fn();
export const userMock = null;
export const loadingMock = false;

export const useAuth = () => ({
  user: userMock,
  loading: loadingMock,
  fetchUser: fetchUserMock,
  logout: logoutMock,
});
