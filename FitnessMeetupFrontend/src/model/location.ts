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


export class Location {
    'lat': number;
    'lng': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "lat",
            "baseName": "lat",
            "type": "number"
        },
        {
            "name": "lng",
            "baseName": "lng",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return Location.attributeTypeMap;
    }
}

