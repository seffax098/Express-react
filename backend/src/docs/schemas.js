/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *       example:
 *         error: Internal server error
 *     ValidationError:
 *       type: object
 *       required:
 *         - error
 *         - details
 *       properties:
 *         error:
 *           type: string
 *           example: Validation error
 *         details:
 *           type: object
 *           additionalProperties:
 *             type: string
 *       example:
 *         error: Validation error
 *         details:
 *           email: email is required
 *     ConflictError:
 *       type: object
 *       required:
 *         - error
 *         - details
 *       properties:
 *         error:
 *           type: string
 *           example: Conflict
 *         details:
 *           type: object
 *           additionalProperties:
 *             type: string
 *       example:
 *         error: Conflict
 *         details:
 *           email: user with this email already exists
 *     UnauthorizedError:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *       example:
 *         error: Invalid or expired token
 *     ForbiddenError:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: Forbidden
 *     NotFoundError:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *       example:
 *         error: Product not found
 *     InvalidCredentialsError:
 *       type: object
 *       required:
 *         - error
 *         - details
 *       properties:
 *         error:
 *           type: string
 *           example: Invalid credentials
 *         details:
 *           type: object
 *           additionalProperties:
 *             type: string
 *       example:
 *         error: Invalid credentials
 *         details:
 *           password: password is incorrect
 *     NothingToUpdateError:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: Nothing to update
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - first_name
 *         - last_name
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, seller, admin]
 *       example:
 *         email: admin@example.com
 *         first_name: Danil
 *         last_name: Ivanov
 *         password: secret123
 *         role: admin
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       example:
 *         email: user@example.com
 *         password: secret123
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *       example:
 *         refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.example
 *     AuthTokens:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *       example:
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access.example
 *         refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.example
 *     AuthUser:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - first_name
 *         - last_name
 *         - role
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, seller, admin, blocked]
 *       example:
 *         id: abc123
 *         email: user@example.com
 *         first_name: Ivan
 *         last_name: Ivanov
 *         role: user
 *     UserResponse:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/AuthUser'
 *     UsersResponse:
 *       type: object
 *       required:
 *         - users
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AuthUser'
 *     UserUpdateRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, seller, admin, blocked]
 *       example:
 *         first_name: Petr
 *         last_name: Petrov
 *         role: seller
 *     BlockUserResponse:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: User blocked
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *       example:
 *         id: prod01
 *         title: Microphone
 *         category: Audio
 *         description: Condenser microphone
 *         price: 5200
 *         stock: 8
 *     ProductCreateRequest:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         title:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *       example:
 *         title: Microphone
 *         category: Audio
 *         description: Condenser microphone
 *         price: 5200
 *         stock: 8
 *     ProductUpdateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *       example:
 *         price: 4999
 *         stock: 12
 */
