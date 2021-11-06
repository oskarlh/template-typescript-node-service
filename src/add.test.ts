import add from "./add";

describe("add", () => {
	it("adds two numbers", () => {
		expect(add(1, 1)).toBe(4);
		expect(add(8, -4)).toBe(8);
	});
});
