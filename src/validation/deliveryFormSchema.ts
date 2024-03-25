import Joi from "joi";

export const deliveryFormSchema = Joi.object().keys({
	customerName: Joi.string().required(),
	address: Joi.string().required(),
	city: Joi.string().required(),
	state: Joi.string().required(),
	zipCode: Joi.string().regex(/^\d+$/).required().messages({
		"string.pattern.base": "Zip Code must have only numeric values",
	}),
	deliverySlot: Joi.string().required(),
});
