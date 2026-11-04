export class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(res, data, message = 'Resource created successfully') {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }

  static error(res, message = 'An error occurred', statusCode = 500, details = null) {
    const response = {
      success: false,
      message
    };
    if (details) {
      response.details = details;
    }
    return res.status(statusCode).json(response);
  }

  static badRequest(res, message = 'Bad request', details = null) {
    return ApiResponse.error(res, message, 400, details);
  }

  static notFound(res, message = 'Resource not found') {
    return ApiResponse.error(res, message, 404);
  }
}
