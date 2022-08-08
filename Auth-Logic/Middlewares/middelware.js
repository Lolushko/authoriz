// import Jwt from "jsonwebtoken";
// import { secret } from "../config/configjwt.js";
// import ApiError from "../exeptions/api-error.js";

// export const adminMiddleware = (roles) => {
//   return async (req, res, next) => {
//     if (req.method === "OPTIONS") {
//       next()
//     }
//     try {
//       const accessToken = req.headers.authorization.split(' ')[1]
//       if (!accessToken) {
//         throw ApiError.UnauThorizedError()
//       }
//       let hasRole = false
//       const user = Jwt.verify(accessToken, secret)
//       user.roles.forEach(role => {
//         if (roles.includes(role)) {
//           hasRole = true
//         } 
//       });
//       if (!hasRole) {
//         throw ApiError.BadRequest('invalid access token')
//       }
//       next() 
//     } catch (err) {
//         if (err instanceof Jwt.TokenExpiredError) {
//           throw ApiError.BadRequest('refresh token expired')
//         }
//         if (err instanceof Jwt.JsonWebTokenError) {
//           throw ApiError.BadRequest('invalid refresh token')
//         }
//       throw ApiError.UnauThorizedError()
//     }
//   }
// }

