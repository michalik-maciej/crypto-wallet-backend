"use strict";
const messages = {
    connected: `Successfully connected to the database`,
    success: { message: `OK` },
    fillInData: { message: `Please fill in input data` },
    notFound: { message: `error 404, resource not found` },
    seatTaken: { message: `The slot is already taken...` },
    error: (err) => ({ message: err }),
    deleted: (info) => ({ message: info })
};
exports.messages = messages;
//# sourceMappingURL=settings.js.map