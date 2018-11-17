"use strict";
/**
 * Fitness Meetup
 * The public API for the FitnessMeetup platform
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Location {
    static getAttributeTypeMap() {
        return Location.attributeTypeMap;
    }
}
Location.discriminator = undefined;
Location.attributeTypeMap = [
    {
        "name": "lat",
        "baseName": "lat",
        "type": "number"
    },
    {
        "name": "lng",
        "baseName": "lng",
        "type": "number"
    }
];
exports.Location = Location;
//# sourceMappingURL=location.js.map