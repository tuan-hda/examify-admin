const getBiggestOrder = (rows: any) => {
  if (Array.isArray(rows) && rows.length > 0) {
    const biggestRow = rows.reduce((prev, curr) =>
      prev.numericOrder > curr.numericOrder ? prev : curr
    );
    return biggestRow.numericOrder;
  } else return 0;
};

export default getBiggestOrder;
