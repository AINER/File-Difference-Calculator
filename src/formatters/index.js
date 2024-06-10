/* eslint-disable consistent-return */

import formatLikeStylish from './stylish-formatter.js';
import formatLikePlain from './plain-formatter.js';
import formatLikeJson from './json-formatter.js';

const formatСomparisonResult = (comparedResultArray, style) => {
  switch (style) {
    case 'stylish':
      return formatLikeStylish(comparedResultArray);
    case 'plain':
      return formatLikePlain(comparedResultArray);
    case 'json':
      return formatLikeJson(comparedResultArray);
    default:
  }
};

export default formatСomparisonResult;
