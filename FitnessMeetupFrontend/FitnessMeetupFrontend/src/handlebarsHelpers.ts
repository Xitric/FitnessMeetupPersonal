import urlEncoder = require("encodeurl");
import validator = require("validator");

const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export let helpers = {
    numberFilter: function (value: string): string {
        if (DomainValidator.isNumber(value)) {
            //Nothing to encode here, it consists only of digits
            return value;
        }

        return "Error: Illegal value";
    },
    letterFilter: function (value: string): string {
        if (DomainValidator.isText(value)) {
            //Nothing to encode here, it consists only of latin letters
            return value;
        }

        return "Error: Illegal value";
    },
    userIdFilter: function (value: string): string {
        if (DomainValidator.isUserId(value)) {
            //Encode the pipe character. I use URL encoding because I know it will be used in URLs
            return urlEncoder(value);
        }

        return "Error: Illegal value";
    },
    linkSanitize: function (value: string): string {
        if (validator.isURL(value)) {
            return urlEncoder(value);
        }

        //Return a link to the landing page as a replacement for illegal URLs
        return "/";
    },
    capitalizeFirstLetter: function (value: string): string {
        return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
    },
    prettyDate: function (value: Date): string {
        let pretty = `${dayNames[value.getDay()]} ${value.getDate()}/${value.getMonth() + 1}`;

        let now = new Date();
        if (now.getFullYear() != value.getFullYear()) {
            pretty += ` ${value.getFullYear()}`;
        }

        pretty += ` at ${value.getHours()}:`

        if (value.getMinutes() < 10) {
            pretty += `0`;
        }

        pretty += `${value.getMinutes()}`;

        return pretty;
    }
}

export class DomainValidator {

    public static isNumber(value: string): boolean {
        return validator.isNumeric(value + "", { no_symbols: true });
    }

    public static isText(value: string): boolean {
        return validator.isAlpha(value);
    }

    public static isUserId(value: string): boolean {
        // whitelist filter for user ids, an example being:
        // google-oauth2|110786492158656662718
        return /^[a-zA-Z0-9-]+[|][a-zA-Z0-9]+$/.test(value);
    }
}
