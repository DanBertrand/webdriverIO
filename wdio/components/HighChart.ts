class HighChart {
  public get component() {
    return browser.react$("HighChart");
  }
  public get points() {
    return browser
      .react$("HighChart")
      .$$(".highcharts-markers .highcharts-point");
  }
}

export default new HighChart();
