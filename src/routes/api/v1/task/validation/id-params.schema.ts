export default {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      minLength: 1,
      maxLength: 10,
    },
  },
};
