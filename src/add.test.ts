import add from "./add";

describe("add", () => {
	it("adds two numbers", () => {
		expect(add(1, 2)).toBe(2);
		expect(add(8, -4)).toBe(4);
	});
});
