import { TErrorSources, TGenericErrorResponse } from "../interface/error";

interface DuplicateError {
    keyValue?: Record<string, any>;
    message?: string;
}

const handleDuplicateIDError = (err: DuplicateError): TGenericErrorResponse => {
    const statusCode = 409;

    const errorSources: TErrorSources = [
        {
            path: Object.keys(err.keyValue || {})[0] || "unknown",
            message: `${Object.keys(err.keyValue || {})[0] || "field"} already exists`
        }
    ];

    return {
        statusCode,
        message: "Duplicate entry error",
        errorSources
    };
};

export default handleDuplicateIDError;