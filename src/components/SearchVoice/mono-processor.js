class MonoProcessor extends AudioWorkletProcessor {
	process(inputs, outputs) {
		const input = inputs[0];
		const output = outputs[0];

		if (input.length > 1) {
			const left = input[0];
			const right = input[1];
			const mono = output[0];

			for (let i = 0; i < left.length; i++) {
				mono[i] = (left[i] + right[i]) / 2;
			}
		} else if (input.length === 1) {
			// Уже моно
			output[0].set(input[0]);
		}

		return true;
	}
}

registerProcessor('mono-processor', MonoProcessor);
