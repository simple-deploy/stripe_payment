if (process.env.NODE_ENV === 'development') {
    module.exports = {
        env: {
            PORT: 3308,
            HOST: "localhost",
            USER: "root",
            PASSWORD: "",
            DATABASE: "productsdb",
            SEND_GRID_API_KEY: "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",
            SEND_EMAIL: "saad@simpledeploy.com",
            REACT_APP_WEB_APP: "localhost:3001",
        },
        typescript: {
            ignoreBuildErrors: true,
        },
    };
}
else {
    module.exports = {
        env: {
            PORT: 3306,
            HOST: "productsdb.csyzb0t2ccvg.eu-central-1.rds.amazonaws.com",
            USER: "root",
            PASSWORD: "incorrect123",
            DATABASE: "productsdb",
            SEND_GRID_API_KEY: "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",
            SEND_EMAIL: "saad@simpledeploy.com"
        },
        typescript: {
            ignoreBuildErrors: true,
        },
    };
}
