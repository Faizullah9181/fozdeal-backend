export const sendErrorResponse = (
    res,
    errCode,
    errorMessage,
    displayErrorMessage,
    statusCode = 400
) => {
    let status = 'failed';
    let errResponse = {
        status,
        errorObject: {
            errCode,
            errorMessage,
            displayErrorMessage
        }
    };
    return res
        .status(statusCode)
        .header('Cache-Control', 'no-cache')
        .json(errResponse);
};
