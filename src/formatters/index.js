import formatLikeStylish from "./stylish-formatter.js";
import formatLikePlain from "./plain-formatter copy.js";

const formatСomparisonResult = (comparedResultArray, style) => {
  switch (style) {
    case "stylish":
      return formatLikeStylish(comparedResultArray);
    case "plain":
      return formatLikePlain(comparedResultArray);
    case "json":
      return comparedResultArray;
  }
};

export default formatСomparisonResult;
