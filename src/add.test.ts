import add from "./add.js";

describe("add", () => {
	it("adds two numbers", () => {
		expect(add(1, 1)).toBe(2);
		expect(add(8, -4)).toBe(4);
	});
});
