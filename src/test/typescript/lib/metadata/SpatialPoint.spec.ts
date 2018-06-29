import { expect } from "chai"
import { describe, it, xit } from "mocha"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import { pointConverter, pointDeconverter } from "../../../../main/typescript/lib/metadata/SpatialPoint"

describe("SpatialPoint", () => {

    const schemes: DropdownListEntry[] = [
        {
            key: "http://www.opengis.net/def/crs/EPSG/0/28992",
            value: "RD (in m.)",
            displayValue: "RD (in m.)",
        },
        {
            key: "http://www.opengis.net/def/crs/EPSG/0/4326",
            value: "lengte/breedte (graden)",
            displayValue: "lengte/breedte (graden)",
        },
    ]

    describe("pointConverter", () => {

        it("should convert a valid spatial point", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                x: "1",
                y: "2",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                x: "1",
                y: "2",
            }
            expect(pointConverter(schemes)(input)).to.eql(expected)
        })

        it("should convert a partial spatial point (only scheme)", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                x: undefined,
                y: undefined,
            }
            expect(pointConverter(schemes)(input)).to.eql(expected)
        })

        it("should convert a partial spatial point (only some coordinates)", () => {
            const input = {
                y: "2",
            }
            const expected = {
                scheme: undefined,
                x: undefined,
                y: "2",
            }
            expect(pointConverter(schemes)(input)).to.eql(expected)
        })

        it("should fail when an invalid scheme is provided", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/fail",
                x: "1",
                y: "2",
            }
            expect(() => pointConverter(schemes)(input)).to
                .throw("Error in metadata: unknown coordinate system: 'http://www.opengis.net/def/crs/EPSG/0/fail'")
        })

        it("should fail when a coordinate does not represent a number", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                x: "abc",
                y: 2,
            }
            expect(() => pointConverter(schemes)(input)).to
                .throw("Error in metadata: Point {\"scheme\":\"http://www.opengis.net/def/crs/EPSG/0/28992\",\"x\":\"abc\",\"y\":2} consists of something else than a Number")
        })
    })

    describe("pointDeconverter", () => {

        it("should convert a SpatialPoint to the correct external format", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                x: "1",
                y: "2",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                x: 1,
                y: 2,
            }
            expect(pointDeconverter(input)).to.eql(expected)
        })

        it("should convert empty fields in the object to an empty object", () => {
            const input = {
                scheme: "",
                x: "",
                y: "",
            }
            const expected = {}
            expect(pointDeconverter(input)).to.eql(expected)
        })
    })
})
