class Color8 extends Number {
	static N_BITS_PER_COMPONENT = 2;
	static COMPONENT_MAX = 0b11;

constructor(red=0, green=0, blue=0, alpha=1) {
	const int =
			(Color8.denorm(alpha) << Color8.N_BITS_PER_COMPONENT * 3)
			+ (Color8.denorm(red) << Color8.N_BITS_PER_COMPONENT * 2)
			+ (Color8.denorm(green) << Color8.N_BITS_PER_COMPONENT * 1)
			+ (Color8.denorm(blue) << Color8.N_BITS_PER_COMPONENT * 0);

	super(int);
}

	static norm(component=1) {
			return component / Color8.COMPONENT_MAX;
	}

static denorm(component=1) {
	return Math.max(0, Math.min(this.COMPONENT_MAX, Math.floor(component * Color8.COMPONENT_MAX)));
}

	extract(nComponentsOffset=0) {
			return Color8.norm(this >>> Color8.N_BITS_PER_COMPONENT * nComponentsOffset & Color8.COMPONENT_MAX);
	}

	get alpha() {
			return this.extract(3);
	}

	get red() {
			return this.extract(2);
	}

	get green() {
			return this.extract(1);
	}

	get blue() {
			return this.extract(0);
	}

	* [Symbol.iterator]() {
			for (let i = 2; i >= 0; i--) {
					yield this.extract(i);
			}
			yield this.extract(3);
	}

	toString() {
			return this.toHexaString();
	}

	toHexaString() {
			return `#${[...this].map(component => (component * 0xFF).toString(16).padStart(2, "0")).join("")}`;
	}
}