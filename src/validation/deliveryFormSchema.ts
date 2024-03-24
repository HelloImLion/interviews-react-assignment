import Joi from "joi";

export const deliveryFormSchema = Joi.object().keys({
	customerName: Joi.string().required(),
	address: Joi.string().required(),
	city: Joi.string().required(),
	state: Joi.string().required(),
	zipCode: Joi.string().required(),
	deliverySlot: Joi.string().required(),
});
