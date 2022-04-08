function getUnixTime(date) {
  return date.getTime() / 1000 | 0;
}

function from(queryInterval) {
  const d = new Date();
  d.setDate(d.getDate() - queryInterval);
  return getUnixTime(d);
}

function to() {
  return getUnixTime(new Date());
}

function transformData(data) {
  return data.c.map((item, index) => ({
    close: Number(item).toFixed(5),
    open: Number(data.o[index]).toFixed(5),
    timestamp: new Date(data.t[index] * 1000).toLocaleDateString(),
  }));
}

module.exports = {
  from: from,
  to: to,
  transformData: transformData,
};
