export default {
  type: 'object',
  required: ['title', 'priority'],
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    priority: {
      type: 'number',
      minimum: 1,
      maximum: 100,
    },
  },
};
