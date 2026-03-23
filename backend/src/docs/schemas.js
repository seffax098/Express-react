/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ValidationError:
 *       type: object
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
 *     AuthToken:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT access token
 *         tokenType:
 *           type: string
 *           example: Bearer
 *         expiresIn:
 *           type: string
 *           example: 15m
 *       example:
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example
 *         tokenType: Bearer
 *         expiresIn: 15m
 *     AuthUser:
 *       type: object
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
 *       example:
 *         id: abc123
 *         email: user@example.com
 *         first_name: Иван
 *         last_name: Иванов
 *     NotFoundError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: User not found
 *         details:
 *           type: object
 *           additionalProperties:
 *             type: string
 *       example:
 *         error: User not found
 *         details:
 *           email: user with this email does not exist
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *       example:
 *         error: Invalid or expired token
 *     InvalidCredentialsError:
 *       type: object
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
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - first_name
 *         - last_name
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID пользователя
 *         email:
 *           type: string
 *           format: email
 *           description: Email пользователя
 *         first_name:
 *           type: string
 *           description: Имя пользователя
 *         last_name:
 *           type: string
 *           description: Фамилия пользователя
 *         password:
 *           type: string
 *           description: Хэш пароля пользователя
 *       example:
 *         id: "123"
 *         email: "123@test.com"
 *         first_name: "Даниил"
 *         last_name: "Иванов"
 *         password: "$2b$10$exampleHash"
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID товара
 *         title:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stock:
 *           type: integer
 *           description: Количество товара
 *       example:
 *         id: "abc123"
 *         title: "Микрофон"
 *         category: "Аудио"
 *         description: "Конденсаторный"
 *         price: 5200
 *         stock: 8
 */
