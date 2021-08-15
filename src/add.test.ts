import add from "./add";

describe("add", () => {
	it("adds 1 and 1", () => {
		expect(add(1, 1)).toBe(2);
	});
});
