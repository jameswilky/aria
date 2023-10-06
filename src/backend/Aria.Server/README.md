# NSwag

https://github.com/RicoSuter/NSwag/wiki/TypeScriptClientGenerator


# Model Validation

There are 3 things to consider with model validation

the `required` accessor will make sure that when the object is created
all properties are required

the  `[Required]` attribute is so that NSwag can mark it as required

for model validation on routes, all parameters are required unless they are explicitly made null