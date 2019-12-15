import * as log4js from 'log4js';

const CustomLogger = log4js.getLogger('CUSTOM_LOGGER');
CustomLogger.level = 'error';

export default CustomLogger;
