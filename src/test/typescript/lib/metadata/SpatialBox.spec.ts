import { expect } from "chai"
import { describe, it, xit } from "mocha"
import { DropdownListEntry } from "../../../../main/typescript/model/DropdownLists"
import { Box, boxConverter, boxDeconverter } from "../../../../main/typescript/lib/metadata/SpatialBox"

describe("SpatialBox", () => {

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

    describe("boxConverter", () => {

        it("should convert a valid spatial box", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            expect(boxConverter(schemes)(input)).to.eql(expected)
        })

        it("should convert a partial spatial box (only scheme)", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: undefined,
                east: undefined,
                south: undefined,
                west: undefined,
            }
            expect(boxConverter(schemes)(input)).to.eql(expected)
        })

        it("should convert a partial spatial box (only some coordinates)", () => {
            const input = {
                west: "4",
            }
            const expected = {
                scheme: undefined,
                north: undefined,
                east: undefined,
                south: undefined,
                west: "4",
            }
            expect(boxConverter(schemes)(input)).to.eql(expected)
        })

        it("should fail when an invalid scheme is provided", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/fail",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            expect(() => boxConverter(schemes)(input)).to
                .throw("Error in metadata: unknown coordinate system: 'http://www.opengis.net/def/crs/EPSG/0/fail'")
        })

        it("should fail when a coordinate does not represent a number", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "abc",
                east: 2,
                south: 3,
                west: 4,
            }
            expect(() => boxConverter(schemes)(input)).to
                .throw("Error in metadata: Box {\"scheme\":\"http://www.opengis.net/def/crs/EPSG/0/28992\",\"north\":\"abc\",\"east\":2,\"south\":3,\"west\":4} consists of something else than a Number")
        })
    })

    describe("boxDeconverter", () => {

        it("should convert a SpatialBox to the correct external format", () => {
            const input = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: "1",
                east: "2",
                south: "3",
                west: "4",
            }
            const expected = {
                scheme: "http://www.opengis.net/def/crs/EPSG/0/28992",
                north: 1,
                east: 2,
                south: 3,
                west: 4,
            }
            expect(boxDeconverter(input)).to.eql(expected)
        })

        it("should convert empty fields in the object to an empty object", () => {
            const input = {
                scheme: "",
                north: "",
                east: "",
                south: "",
                west: "",
            }
            const expected = {}
            expect(boxDeconverter(input)).to.eql(expected)
        })
    })
})
