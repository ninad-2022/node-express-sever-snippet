class Validator {
	payload = (schema) => {
		return (req, res, next) => {
			const result = schema.validate(req.body);

			if (result?.error) {
				res.status(400).json({ message: result.error.message });
			} else {
				next();
			}
		};
	};
}

module.exports = new Validator();
